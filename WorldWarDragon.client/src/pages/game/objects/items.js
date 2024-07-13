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
    if (AppState.account.attack > 0 || AppState.account.shield > 0 || AppState.account.heal > 0) {
      const positions = [
        { x: this.x, y: this.y - 300, id: 0 },
        { x: this.x, y: this.y + 300, id: 2 },
        { x: this.x + 300, y: this.y, id: 1 },
        { x: this.x - 300, y: this.y, id: 3 }
      ];

      positions.forEach((pos, index) => {
        const obj = this.scene.add.sprite(pos.x, pos.y, 'star')
          .setInteractive()
          .setDepth(200);
        obj.id = pos.id; // Assign the ID to the object

        // Change color on hover
        obj.on('pointerover', () => {
          if (!this.isDrawing) {
            // obj.setTint(0x00ff00); // Hover color - green
          } else {
            this.inputCode.push(obj.id)
            obj.setTint(0xff0000); // red
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
          logger.log('made it here', this.isDrawing);
          if (!this.isDrawing) {
            this.startDrawing(obj.x, obj.y, obj);
            obj.setTint(0xff0000); // Clicked color
            this.inputCode.push(obj.id)
          } else {
            this.stopDrawing(obj);
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
    this.currentLine = this.scene.add.line(0, 0, x, y, x, y, 0xff0000)
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

      if (this.lines.length < 3) {
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

  checkInputCode() {
    logger.log(this.inputCode)
    if (this.action == 'input') {
      this.patterns.attack.forEach((i) => {
        if (this.inputCode[i] == i) {
          if (this.action == 'input') {
            this.action = 'attack'
          }
        }
        this.patterns.shield.forEach((i) => {
          if (this.inputCode[i] == i) {
            if (this.action == 'input') {
              this.action = 'shield'
            }
          }
        })
        this.patterns.heal.forEach((i) => {
          if (this.inputCode[i] == i) {
            if (this.action == 'input') {
              this.action = 'heal'
            }
          }
        })
      })
    }

    if (this.action != 'input') {
      AppState.account[this.action] -= 1
      const accontData = AppState.account
      accountService.editAccount(accontData)

      this.useItem();

      this.action = 'input'
    }
  }

  useItem() {
    if (this.action = 'attack') {
      this.scene.events.emit('dragon:attackItem')
    } else if (this.action = 'shield') {
      this.scene.events.emit('dragon:shieldItem')
    } else if (this.action = 'heal') {
      this.scene.events.emit('dragon:healItem')
    } else {
    }
  }

  cancelDrawing() {
    this.isDrawing = false;
    this.lines.forEach(line => line.destroy());
    this.lines = [];
    this.interactiveObjects.forEach(obj => obj.setTint(0xffffff)); // Reset color
    this.inputCode = [];
  }
}