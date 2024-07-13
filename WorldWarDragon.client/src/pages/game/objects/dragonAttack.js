import { EventBus } from '../EventBus';
import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
import { GameObjects } from 'phaser';

export class DragonAttack extends GameObjects.Container {
  constructor(scene, dragon) {
    super(scene, dragon.x, dragon.y + 50); // Initialize the container below the dragon

    this.scene = scene;
    this.dragon = dragon;
    this.attackInterval = 5000; // Time between attacks in milliseconds
    this.lastAttackTime = this.scene.time.now;

    this.dragonSounds = [
      `dragonAttack_1`,
      `dragonAttack_2`,
      `dragonAttack_3`,
      `dragonAttack_4`,
      `dragonAttack_5`,
    ]

    // Create a progress bar
    this.progressBar = this.scene.add.graphics();
    this.progressBarBackground = this.scene.add.graphics();
    this.add(this.progressBarBackground);
    this.add(this.progressBar);

    this.progressBarWidth = 100; // Initial width of the progress bar
    this.progressBarHeight = 10; // Initial height of the progress bar

    this.scene.add.existing(this);
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
    console.log('Dragon attacks!');

    const selectedSound = this.getRandomSound()
    const sound = this.scene.sound.add(selectedSound)
    sound.play();
    sound.volume = 0.5;

    logger.log('PLAYERHP', this.scene.playerHp)
    this.scene.playerHp -= 10
    this.scene.playerText.setText(`${AppState.account.name}\nHP: ${this.scene.playerHp}`)
    if (this.scene.playerHp <= 0) {
      EventBus.emit('navigate-home');
    }

    this.lastAttackTime = this.scene.time.now; // Reset the timer for the next attack
  }


  getRandomSound() {
    return Phaser.Math.RND.pick(this.dragonSounds);
  }

  updateProgressBar() {
    const elapsed = this.scene.time.now - this.lastAttackTime;
    const progress = elapsed / this.attackInterval;

    this.progressBar.clear();
    this.progressBarBackground.clear();

    // Draw the background
    this.progressBarBackground.fillStyle(0x000000, 0.5);
    this.progressBarBackground.fillRect(
      -this.progressBarWidth / 2,
      -this.progressBarHeight / 2,
      this.progressBarWidth,
      this.progressBarHeight
    );

    // Draw the progress
    this.progressBar.fillStyle(0xff0000, 1);
    this.progressBar.fillRect(
      -this.progressBarWidth / 2,
      -this.progressBarHeight / 2,
      this.progressBarWidth * progress,
      this.progressBarHeight
    );
  }

  update() {
    this.updateProgressBar();
  }

  setProgressBarSize(width, height) {
    // logger.log('new size')
    this.progressBarWidth = width;
    this.progressBarHeight = height;
    this.updateProgressBar();
  }

  updatePosition() {
    // logger.log('new position')
    this.setPosition(this.scene.dragon.x, this.scene.dragon.y + 50); // Update the container position relative to the dragon
  }
}