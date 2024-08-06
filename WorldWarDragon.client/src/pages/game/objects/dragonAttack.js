import { EventBus } from '../EventBus';
import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
import { GameObjects } from 'phaser';

export class DragonAttack {
  constructor(scene, dragon) {
    // super(scene, dragon.x, dragon.y + 50); // Initialize the container below the dragon
    this.dragon = dragon
    this.dragonX = dragon.originalX
    this.dragonY = dragon.originalY

    this.scene = scene;
    this.attackInterval = 5000; // Time between attacks in milliseconds


    this.dragonSounds = [
      `dragonAttack_1`,
      `dragonAttack_2`,
      `dragonAttack_3`,
      `dragonAttack_4`,
      `dragonAttack_5`,
    ]

    this.createBar();
  }

  createBar() {
    const { width, height } = this.scene.cameras.main;
    const barWidth = width / 2

    logger.log('DRAGON', this.dragon)

    this.attackContainer = this.scene.add.container(this.dragonX, this.dragonY + height * .22)

    this.barBackground = this.scene.add.rectangle(0, 0, barWidth, 10, 0x000000).setOrigin(0.5, 1);

    this.attackBar = this.scene.add.rectangle(0, -2.5, barWidth - 10, 5, 0x8e22cf).setOrigin(0.5, 1).setDepth(400);

    this.attackContainer.add(this.barBackground);
    this.attackContainer.add(this.attackBar);
  }

  startAttack() {
    this.lastAttackTime = this.scene.time.now;
    this.scene.time.addEvent({
      delay: this.attackInterval,
      callback: this.attack,
      callbackScope: this,
      loop: true
    });
  }

  attack() {
    // Logic for dragon attack

    const selectedSound = this.getRandomSound()
    const sound = this.scene.sound.add(selectedSound)
    sound.play();
    sound.volume = 0.5;

    logger.log('PLAYERHP', this.scene.playerHp)
    this.scene.playerHp -= 10 * AppState.activeRoom.difficulty
    this.scene.playerUi.updatePlayerHp(this.scene.playerHp)
    if (this.scene.playerHp <= 0) {
      this.scene.sound.stopAll()
      this.scene.scene.start('GameOver');
    }

    this.lastAttackTime = this.scene.time.now; // Reset the timer for the next attack
  }


  getRandomSound() {
    return Phaser.Math.RND.pick(this.dragonSounds);
  }

  updateProgressBar() {
    const { width, height } = this.scene.cameras.main;
    const barWidth = width / 2
    if (this.lastAttackTime == 0) {
      this.lastAttackTime = this.scene.time.now
    }
    const elapsed = this.scene.time.now - this.lastAttackTime;
    const progress = elapsed / this.attackInterval;

    this.attackBar.width = progress * (barWidth - 10);

  }

  update() {
    this.updateProgressBar();
  }

}