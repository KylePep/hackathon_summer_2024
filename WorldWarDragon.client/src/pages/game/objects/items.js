import { Scene } from 'phaser';
import { AppState } from "../../../AppState.js";
import { logger } from "../../../utils/Logger.js";
import { accountService } from "../../../services/AccountService.js";

export class Item {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.items = ['attack', 'shield', 'heal'];
    this.patterns = {
      attack: [0, 3, 1, 2],
      shield: [0, 3, 2, 1],
      heal: [0, 2, 1, 3],
    }
    this.inputCode = []
    this.action = 'input'
    this.interactiveObjects = [];
    this.lines = [];
    this.isDrawing = false;
    this.lineWidth = 5; // Set the desired line width here

    this.createInteractiveObjects();
  }

  createInteractiveObjects() {
    const { width, height } = this.scene.cameras.main;
    const items = (AppState.account.attack + AppState.account.attackAid + AppState.account.shield + AppState.account.shieldAid + AppState.account.heal + AppState.account.healAid)
    if (items > 0) {
      const positions = [
        { x: width / 2, y: 128, id: 0 },
        { x: width / 2, y: height - 128, id: 2 },
        { x: width - 64, y: height / 2, id: 1 },
        { x: 64, y: height / 2, id: 3 }
      ];

      const FRAME_COUNT = 5;
      const FRAME_RATE = 3;

      this.scene.anims.create({
        key: 'playGif',
        frames: this.scene.anims.generateFrameNumbers('animatedCrystal', { start: 0, end: FRAME_COUNT - 1 }),
        frameRate: FRAME_RATE,
        repeat: -1 // Loop the animation
      });

      // Floating tween parameters
      const FLOAT_DISTANCE = 3; // Distance in pixels for floating
      const FLOAT_DURATION = 2000; // Duration of the float cycle in millisecond

      positions.forEach((pos, index) => {
        const obj = this.scene.add.sprite(pos.x, pos.y, 'animatedCrystal')
          .setScale(1.5)
          .setInteractive()
          .setDepth(100);
        obj.id = pos.id; // Assign the ID to the object
        // obj.texture.setFilter(Phaser.ScaleModes.NEAREST);

        // Floating tween animation
        this.scene.tweens.add({
          targets: obj,
          y: obj.y - FLOAT_DISTANCE, // Move up by FLOAT_DISTANCE pixels
          duration: FLOAT_DURATION / 2, // Half of the total duration
          yoyo: true, // Make the tween return to the original position
          repeat: -1 // Repeat indefinitely
        });

        // Change color on hover
        obj.on('pointerover', () => {
          if (!this.isDrawing) {
            // obj.setTint(0x00ff00); // Hover color - green
          } else {
            this.setInputCode(obj.id)
            obj.play('playGif')
            obj.setTint(0x00C1FF); // red
            this.addStaticLine(obj);
          }
        });

        obj.on('pointerout', () => {
          if (!this.isDrawing) {
            obj.setTint(0xffffff); // Default color
          }
        });

        // Change color on click and start drawing
        obj.on('pointerdown', (pointer) => {
          if (!this.isDrawing) {
            this.startDrawing(obj.x, obj.y, obj);
            obj.setTint(0x00C1FF); // Clicked color
            this.inputCode.push(obj.id)
            obj.play('playGif')
          } else {
            this.stopDrawing(obj);
            obj.stop('playGif')
            obj.setTint(0xffffff); // Reset to default color
          }
        });

        this.interactiveObjects.push(obj);
      });

      this.scene.input.on('pointermove', (pointer) => {
        if (this.isDrawing) {
          this.updateLine(pointer.x, pointer.y);
        }
      });

      this.scene.input.on('pointerup', (pointer) => {
        if (this.isDrawing) {
          this.cancelDrawing();
        }
      });
    }
  }

  startDrawing(x, y, obj) {
    if (this.lines.length >= 4) {
      this.stopDrawing(obj);
      return;
    }
    this.isDrawing = true;
    this.startX = x;
    this.startY = y;
    this.currentLine = this.scene.add.line(0, 0, x, y, x, y, 0x00C1FF)
      .setOrigin(0, 0)
      .setDepth(100)
      .setLineWidth(this.lineWidth); // Set line width here
    this.lines.push(this.currentLine);
    this.startObject = obj;
  }

  updateLine(x, y) {
    if (this.currentLine) {
      const dx = x - this.startX;
      const dy = y - this.startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Phaser.Math.Angle.Between(this.startX, this.startY, x, y);

      this.currentLine.setTo(this.startX, this.startY, this.startX + distance * Math.cos(angle), this.startY + distance * Math.sin(angle));
    }
  }

  addStaticLine(obj) {
    if (this.currentLine) {
      const line = this.currentLine;
      const dx = obj.x - this.startX;
      const dy = obj.y - this.startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Phaser.Math.Angle.Between(this.startX, this.startY, obj.x, obj.y);

      line.setTo(this.startX, this.startY, this.startX + distance * Math.cos(angle), this.startY + distance * Math.sin(angle));
      line.setLineWidth(this.lineWidth); // Ensure line width is set

      if (this.inputCode.length < 4) {
        this.startDrawing(obj.x, obj.y, obj);
      } else {
        this.stopDrawing(obj);
      }
    }
  }

  stopDrawing(obj) {
    this.isDrawing = false;
    if (this.startObject !== obj) {
      const line = this.currentLine;
      if (line) {
        const dx = obj.x - this.startX;
        const dy = obj.y - this.startY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Phaser.Math.Angle.Between(this.startX, this.startY, obj.x, obj.y);

        line.setTo(this.startX, this.startY, this.startX + distance * Math.cos(angle), this.startY + distance * Math.sin(angle));
        line.setLineWidth(this.lineWidth); // Ensure line width is set
        // Logic for completing the action when all objects are connected can be added here
        this.checkInputCode()
        this.cancelDrawing();
      }
    } else {
      this.cancelDrawing();
    }
  }

  setInputCode(objId) {
    if (this.inputCode[this.inputCode.length - 1] != objId) {
      this.inputCode.push(objId)
    }
  }

  checkInputCode() {
    if (this.action == 'input') {
      const inputCodeString = this.inputCode.join('');

      // Convert pattern arrays to strings for easy comparison
      const patterns = {
        attack: this.patterns.attack.join(''),
        attackAlt: this.patterns.attack.reverse().join(''),
        shield: this.patterns.shield.join(''),
        shieldAlt: this.patterns.shield.reverse().join(''),
        heal: this.patterns.heal.join(''),
        healAlt: this.patterns.heal.reverse().join('')
      };

      // Check if inputCode matches any pattern
      if (inputCodeString === patterns.attack || inputCodeString === patterns.attackAlt) {
        this.action = 'attack';
      } else if (inputCodeString === patterns.shield || inputCodeString === patterns.shieldAlt) {
        this.action = 'shield';
      } else if (inputCodeString === patterns.heal || inputCodeString === patterns.healAlt) {
        this.action = 'heal';
      }
    }

    logger.log('ACTION', this.action, 'CODE', this.inputCodeString, 'INPUT-CODE', this.inputCode);

    if (this.action != 'input') {
      if (AppState.account[this.action] > 0 || AppState.account[`${this.action}Aid`] > 0) {
        if (AppState.account[`${this.action}Aid`] > 0) {
          AppState.account[`${this.action}Aid`] -= 1;
        } else {
          AppState.account[this.action] -= 1;
        }
        const accountData = AppState.account;
        accountService.editAccount(accountData);

        this.useItem();

      } else {
        AppState.account[this.action] = 0;
        AppState.account[`${this.action}Aid`] = 0;
        const accountData = AppState.account;
        accountService.editAccount(accountData);
      }

      this.action = 'input';
    }
    this.inputCode = [];
  }

  useItem() {

    if (this.action == 'attack') {
      this.scene.events.emit('dragon:attackItem')
      this.scene.playerUi.updateItem()
    } else if (this.action == 'shield') {
      this.scene.events.emit('dragon:shieldItem')
      this.scene.playerUi.updateItem()
    } else if (this.action == 'heal') {
      const selectedSound = 'healItem'
      const sound = this.scene.sound.add(selectedSound)
      sound.play();
      sound.volume = 1;
      this.scene.playerHp = this.scene.playerMaxHp;
      this.scene.playerUi.updatePlayerHp(this.scene.playerHp)
      this.scene.playerUi.updateItem()
    } else {
    }
  }

  cancelDrawing() {
    this.isDrawing = false;
    this.lines.forEach(line => line.destroy());
    this.lines = [];
    this.interactiveObjects.forEach(obj => {
      obj.setTint(0xffffff)
      obj.stop('playGif')
    }); // Reset color
    this.inputCode = [];
  }
}