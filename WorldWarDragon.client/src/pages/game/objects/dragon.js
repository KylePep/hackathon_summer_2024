import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
import { bossDamageService } from "../../../services/BossDamageService.js";

export class Dragon {
  constructor(scene, x, y) {
    this.scene = scene;
    this.dragonHP = this.getRandomDragonHP();
    this.bossDamage = Phaser.Math.RoundTo((.1 * this.dragonHP), 0);
    this.modifier = Phaser.Math.RND.pick([1.1, .9])
    this.gold = Phaser.Math.RoundTo((this.bossDamage * this.modifier), 0)
    this.valor = Phaser.Math.RoundTo((this.bossDamage * 0.1), 0)
    logger.log('Gold', this.gold, this.bossDamage, this.valor)

    this.dragon = this.scene.add.sprite(x, y, this.getRandomDragonSprite()).setOrigin(0.5, 0.5)
    this.setScaleToFitWindow(0);
    this.scene.scale.on('resize', this.setScaleToFitWindow, this)

    this.originalX = this.dragon.x;
    this.originalY = this.dragon.y;
    this.originalAngle = 0;

    this.dragon.setInteractive()
    this.addInteractions()
    this.setupEventListeners();
  }

  setScaleToFitWindow(modifier) {
    const { width, height } = this.scene.cameras.main
    const dragonWidth = this.dragon.width
    const dragonHeight = this.dragon.height

    const scaleX = width / dragonWidth
    const scaleY = height / dragonHeight

    const scale = Math.min(scaleX, scaleY) * 0.5 + modifier;
    this.dragon.setScale(scale)
  }

  getRandomDragonHP() {
    const minHP = 10; // 100 / 10
    const maxHP = 100; // 1000 / 10
    return Phaser.Math.Between(minHP, maxHP) * (1 + (AppState.activeRoom.difficulty * AppState.activeRoom.difficulty));
  }

  getRandomDragonSprite() {
    const dragonImages = ['dragon_1', 'dragon_3', 'dragon_4', 'dragon_5'];
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

    this.dragonHP -= AppState.account.power
    console.log(this.dragonHP)
    this.scene.clickText.setText(`HP: ${this.dragonHP}`)

    if (this.dragonHP <= 0) {

      AppState.bossDamage = this.bossDamage
      AppState.gold = this.gold
      AppState.valor = this.valor

      this.scene.events.off('dragon:hit')
      this.scene.events.off('dragon:over')
      this.scene.events.off('dragon:out')
      logger.log(this.scene.events.off('dragon:hit'))
      this.scene.leaveRoom()

    }


    // this.canAnimate = true

    // if (this.canAnimate != false) {

    this.scene.tweens.add({

      // Shake effect
      targets: this.dragon,
      duration: 100, // Duration of the shake in milliseconds
      ease: 'Power1',
      x: this.dragon.x + Phaser.Math.RND.between(-16, 16), // Random X offset
      y: this.dragon.y + Phaser.Math.RND.between(-16, 16), // Random Y offset
      angle: this.dragon.angle + Phaser.Math.RND.between(-16, 16),
      yoyo: true, // Yoyo back to original position
      repeat: 0, // Number of times to repeat (0 means no repeat, just once)
      // onStart: () => {
      //   this.canAnimate = false
      // },
      onComplete: () => {
        // Reset to original values
        this.dragon.x = this.originalX;
        this.dragon.y = this.originalY;
        this.dragon.angle = this.originalAngle;
        // this.canAnimate = true
      }
    });
    // }
  }

  onPointerOver() {
    // this.dragon.setTint(0xD62E0B);
    this.setScaleToFitWindow(.2)
    this.dragon.y -= 8;
    this.scene.input.setDefaultCursor('pointer');
  }

  onPointerOut() {
    // this.dragon.clearTint();
    this.setScaleToFitWindow(0)
    this.dragon.y = this.originalY;
    this.scene.input.setDefaultCursor('default');
  }



}