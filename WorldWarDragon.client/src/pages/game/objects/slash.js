import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
export class Slash {
  constructor(scene, x, y) {
    this.scene = scene;

    this.entryState = 'none'

    this.slash = this.scene.add.sprite(x, y, 'star').setOrigin(0.5, 0.5).setAlpha(0.2)
    this.setScaleToFitWindow(0);
    this.scene.scale.on('resize', this.setScaleToFitWindow, this)
    this.slash.setInteractive()
    this.addInteractions()
  }

  setScaleToFitWindow(modifier) {
    const { width, height } = this.scene.cameras.main
    const slashWidth = this.slash.width
    const slashHeight = this.slash.height

    const scaleX = width / slashWidth
    const scaleY = height / slashHeight

    const scale = Math.min(scaleX, scaleY) * 0.25 + modifier;
    this.slash.setScale(scale)
  }

  getRandomDragonSound() {
    const dragonSounds = ['swish_2', 'swish_3', 'swish_4'];
    return Phaser.Math.RND.pick(dragonSounds);
  }

  addInteractions() {

    this.slash.on('pointerdown', (pointer) => {

      this.scene.events.emit('dragon:hit', pointer);

    });

    this.slash.on('pointerover', (pointer) => {
      this.entryState = 'enter'
      this.slash.setTint(0xD60B0B)
      this.slash.setAlpha(0.4)
      this.setScaleToFitWindow(.2)


      this.scene.events.emit('dragon:over', pointer);

    })

    this.slash.on('pointerout', (pointer) => {
      this.slash.setTint()
      this.slash.setAlpha(0.2)
      this.setScaleToFitWindow(0)
      this.slash.setAngle(Phaser.Math.RND.between(0, 180))

      this.scene.events.emit('dragon:out', pointer);

      if (this.entryState == 'enter') {
        this.entryState = 'exit'

        this.scene.events.emit('dragon:hit', pointer);
      }

    })

  }
  destroy() {
    logger.log('destroy - slash')

    // Remove from the scene
    this.slash.destroy();
  }

}