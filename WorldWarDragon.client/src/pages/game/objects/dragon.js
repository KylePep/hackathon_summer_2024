import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
import { bossDamageService } from "../../../services/BossDamageService.js";

export class Dragon {
  constructor(scene, x, y) {
    this.scene = scene;
    this.dragonHP = 100;
    this.bossDamage = 10;

    this.dragon = this.scene.add.sprite(x, y, this.getRandomDragonSprite()).setOrigin(0.5, 0.5).setScale(4, 4)
    this.dragon.setInteractive()
    this.addInteractions()
  }

  getRandomDragonSprite() {
    const dragonImages = ['dragon_1', 'dragon_2', 'dragon_3', 'dragon_4', 'dragon_5'];
    return Phaser.Math.RND.pick(dragonImages);
  }

  getRandomDragonSound() {
    const dragonSounds = ['swish_2', 'swish_3', 'swish_4'];
    return Phaser.Math.RND.pick(dragonSounds);
  }

  addInteractions() {



    this.dragon.on('pointerdown', () => {
      const selectedSound = this.getRandomDragonSound()
      const sound = this.scene.sound.add(selectedSound)
      sound.play();
      sound.volume = 0.2;

      this.dragonHP -= 10
      console.log(this.dragonHP)
      this.scene.clickText.setText(`HP: ${this.dragonHP}`)

      // Shake effect
      this.scene.tweens.add({
        targets: this.dragon,
        duration: 100, // Duration of the shake in milliseconds
        ease: 'Power1',
        x: this.dragon.x + Phaser.Math.RND.between(-16, 16), // Random X offset
        y: this.dragon.y + Phaser.Math.RND.between(-16, 16), // Random Y offset
        angle: this.dragon.angle + Phaser.Math.RND.between(-16, 16),
        yoyo: true, // Yoyo back to original position
        repeat: 0 // Number of times to repeat (0 means no repeat, just once)
      });

      if (this.dragonHP <= 0) {
        this.updateBossHP({
          dmg: this.bossDamage,
          bossId: AppState.activeBoss.id
        })
        this.dragonHP = 100;
        this.scene.scene.start('GameResults')
      }

    });

    this.dragon.on('pointerover', () => {
      this.dragon.setTint(0xD62E0B);
      this.dragon.setScale(4.1);
      this.dragon.y -= 6;
      this.scene.input.setDefaultCursor('pointer');
    });

    this.dragon.on('pointerout', () => {
      this.dragon.clearTint();
      this.dragon.setScale(4);
      this.dragon.y += 6;
      this.scene.input.setDefaultCursor('default');
    });
  }

  updateBossHP(bossDamageData) {
    AppState.bossDamage = this.bossDamage
    logger.log('BossDamage', AppState.bossDamage)
    bossDamageService.createOrIncreaseBossDamage(bossDamageData)
  }

}