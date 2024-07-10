import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
export class Slash {
  constructor(scene, x, y) {
    this.scene = scene;

    this.entryState = 'none'

    this.slash = this.scene.add.sprite(x, y, 'star').setOrigin(0.5, 0.5).setScale(8, 8).setAlpha(0.2)
    this.slash.setInteractive()
    this.addInteractions()
  }
  getRandomDragonSound() {
    const dragonSounds = ['swish_2', 'swish_3', 'swish_4'];
    return Phaser.Math.RND.pick(dragonSounds);
  }

  addInteractions() {

    this.slash.on('pointerdown', (pointer) => {

      this.scene.events.emit('dragon:hit', pointer);

      // this.scene.dragon.dragonHP -= 10
      // const selectedSound = this.getRandomDragonSound()
      // const sound = this.scene.sound.add(selectedSound)
      // sound.play();
      // sound.volume = 0.2;
      // console.log(this.scene.dragon.dragonHP)
      // this.scene.clickText.setText(`HP: ${this.scene.dragon.dragonHP}`)

      // if (this.scene.dragon.dragonHP <= 0) {
      //   this.scene.dragon.updateBossHP({
      //     dmg: this.bossDamage,
      //     bossId: AppState.activeBoss.id
      //   })
      //   this.scene.dragon.dragonHP = 100;
      //   this.scene.scene.start('GameResults')
      // }

    });

    this.slash.on('pointerover', (pointer) => {
      this.entryState = 'enter'
      this.slash.setTint(0xD60B0B)
      this.slash.setAlpha(0.8)

      this.scene.events.emit('dragon:over', pointer);

    })

    this.slash.on('pointerout', (pointer) => {
      this.slash.setTint()
      this.slash.setAlpha(0.2)

      this.scene.events.emit('dragon:out', pointer);

      if (this.entryState == 'enter') {
        this.entryState = 'exit'

        this.scene.dragon.dragonHP -= 10
        const selectedSound = this.getRandomDragonSound()
        const sound = this.scene.sound.add(selectedSound)
        sound.play();
        sound.volume = 0.2;
        console.log(this.scene.dragon.dragonHP)
        this.scene.clickText.setText(`HP: ${this.scene.dragon.dragonHP}`)

        if (this.scene.dragon.dragonHP <= 0) {
          this.scene.dragon.updateBossHP({
            dmg: this.bossDamage,
            bossId: AppState.activeBoss.id
          })
          this.scene.dragon.dragonHP = 100;
          this.scene.scene.start('GameResults')
        }
      }

    })

  }
}