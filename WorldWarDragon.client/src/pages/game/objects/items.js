import { Scene } from 'phaser';
import { AppState } from "../../../AppState.js";
import { logger } from "../../../utils/Logger.js";

export class Item {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.items = ['attack', 'shield', 'heal'];
    this.interactiveObjects = [];
    this.lines = [];
    this.isDrawing = false;

    this.createInteractiveObjects();
  }

  createInteractiveObjects() {
    if (AppState.account.attack > 0 || AppState.account.shield > 0 || AppState.account.heal > 0) {
      const positions = [
        { x: this.x, y: this.y - 300 },
        { x: this.x, y: this.y + 300 },
        { x: this.x + 300, y: this.y },
        { x: this.x - 300, y: this.y }
      ];

      positions.forEach((pos, index) => {
        const obj = this.scene.add.circle(pos.x, pos.y, 20, 0xffffff)
          .setInteractive()
          .setDepth(200);

        // Change color on hover
        obj.on('pointerover', () => {
          if (!this.isDrawing) {
            obj.setFillStyle(0x00ff00); // Hover color
          }
        });

        obj.on('pointerout', () => {
          if (!this.isDrawing) {
            obj.setFillStyle(0xffffff); // Default color
          }
        });

        // Change color on click and start drawing
        obj.on('pointerdown', () => {
          if (!this.isDrawing) {
            logger.log('made it here', this.isDrawing)
            this.startDrawing(pos.x, pos.y, obj);
            obj.setFillStyle(0xff0000); // Clicked color
          } else {
            this.stopDrawing(obj);
            obj.setFillStyle(0xffffff); // Reset to default color
          }
        });

        this.interactiveObjects.push(obj);
      });

      this.scene.input.on('pointermove', (pointer) => {
        if (this.isDrawing) {
          this.updateLine(pointer.x, pointer.y);
        }
      });

      // this.scene.input.on('pointerdown', () => {
      //   if (this.isDrawing) {
      //     this.cancelDrawing();
      //   }
      // });
    }
  }

  startDrawing(x, y, obj) {
    this.isDrawing = true;
    this.lines.push(this.scene.add.line(x, y, 0, 0, 0, 0, 0xff0000).setOrigin(0, 0).setDepth(100));
    this.startObject = obj;
  }

  updateLine(x, y) {
    if (this.lines.length > 0) {
      const line = this.lines[this.lines.length - 1];
      line.setTo(line.geom.x1, line.geom.y1, x - line.geom.x1, y - line.geom.y1);
    }
  }

  stopDrawing(obj) {
    this.isDrawing = false;
    if (this.startObject !== obj) {
      const line = this.lines[this.lines.length - 1];
      line.setTo(line.geom.x1, line.geom.y1, obj.x - line.geom.x1, obj.y - line.geom.y1);
      // Logic for completing the action when all objects are connected can be added here
    } else {
      this.cancelDrawing();
    }
  }

  cancelDrawing() {
    this.isDrawing = false;
    this.lines.forEach(line => line.destroy());
    this.lines = [];
    this.interactiveObjects.forEach(obj => obj.setFillStyle(0xffffff)); // Reset color
  }
}