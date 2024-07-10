import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
import { bossDamageService } from "../../../services/BossDamageService.js";

export class Dragon {
  constructor(scene, x, y) {
    this.scene = scene;
    this.dragonHP = this.getRandomDragonHP();
    this.bossDamage = 10 * (this.dragonHP * .01);

    this.dragon = this.scene.add.sprite(x, y, this.getRandomDragonSprite()).setOrigin(0.5, 0.5).setScale(4, 4)
    this.dragon.setInteractive()
    this.addInteractions()
    this.setupEventListeners();
  }

  getRandomDragonHP() {
    const minHP = 10; // 100 / 10
    const maxHP = 100; // 1000 / 10
    return Phaser.Math.Between(minHP, maxHP) * 10;
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
      this.onDragonHit()

    });

    this.dragon.on('pointerover', () => {
      this.onPointerOver()
    });

    this.dragon.on('pointerout', () => {
      this.onPointerOut()
    });
  }

  setupEventListeners() {
    this.scene.events.on('dragon:hit', this.onDragonHit, this);
    this.scene.events.on('dragon:over', this.onPointerOver, this);
    this.scene.events.on('dragon:out', this.onPointerOut, this);
  }

  onDragonHit() {
    const selectedSound = this.getRandomDragonSound()
    const sound = this.scene.sound.add(selectedSound)
    sound.play();
    sound.volume = 0.2;

    this.dragonHP -= 10
    console.log(this.dragonHP)
    this.scene.clickText.setText(`HP: ${this.dragonHP}`)

    if (this.dragonHP <= 0) {

      this.updateBossHP({
        dmg: this.bossDamage,
        bossId: AppState.activeBoss.id
      })
      this.scene.events.off('dragon:hit')
      this.scene.events.off('dragon:over')
      this.scene.events.off('dragon:out')
      logger.log(this.scene.events.off('dragon:hit'))
      this.scene.leaveRoom()

    }

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
  }

  onPointerOver() {
    this.dragon.setTint(0xD62E0B);
    this.dragon.setScale(4.2);
    this.dragon.y -= 8;
    this.scene.input.setDefaultCursor('pointer');
  }

  onPointerOut() {
    this.dragon.clearTint();
    this.dragon.setScale(4);
    this.dragon.y += 8;
    this.scene.input.setDefaultCursor('default');
  }

  // destroy() {
  //   logger.log('destroy - dragon')
  //   // Remove event listeners
  //   this.dragon.removeListener('dragon:hit');
  //   this.dragon.off('dragon:over');
  //   this.dragon.off('dragon:out');

  //   // Remove from the scene
  //   this.dragon.destroy();
  // }

  updateBossHP(bossDamageData) {
    AppState.bossDamage = this.bossDamage
    logger.log('BossDamage', AppState.bossDamage)
    bossDamageService.createOrIncreaseBossDamage(bossDamageData)
  }

}