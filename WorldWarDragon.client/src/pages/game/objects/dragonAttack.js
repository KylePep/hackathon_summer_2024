import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";

export class DragonAttack {
  constructor(scene, dragon) {
    // super(scene, dragon.x, dragon.y + 50); // Initialize the container below the dragon
    this.dragon = dragon
    this.dragonX = dragon.originalX
    this.dragonY = dragon.originalY

    this.scene = scene;
    this.attackInterval = 5000; // Time between attacks in milliseconds

    this.lastAttackTime = this.scene.time.now

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
    this.barColor = 0x8e22cf

    this.attackContainer = this.scene.add.container(this.dragonX, this.dragonY + height * .22)

    this.barBackground = this.scene.add.rectangle(0, 0, barWidth, 10, 0x000000).setOrigin(0.5, 1);

    this.attackBar = this.scene.add.rectangle(0, -2.5, barWidth - 10, 5, this.barColor).setOrigin(0.5, 1).setDepth(400);

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
    const { width, height } = this.scene.cameras.main;

    const FRAME_COUNT = 5;
    const FRAME_RATE = 30;

    if (this.scene.shield > 0) {
      this.scene.shield -= 1
      const selectedSound = 'shield_use'
      const sound = this.scene.sound.add(selectedSound)
      sound.play();
      sound.volume = 0.5;

      const blueFlash = this.scene.add.graphics();
      blueFlash.fillStyle(0x0081ff, 0.25);
      blueFlash.fillRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);

      this.scene.tweens.add({
        targets: blueFlash,
        alpha: 0,
        duration: 200,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          blueFlash.destroy();
        }
      });

    } else {

      const selectedSound = this.getRandomSound()
      const sound = this.scene.sound.add(selectedSound)
      sound.play();
      sound.volume = 0.5;

      this.scene.playerHp -= 10 * AppState.activeRoom.difficulty
      this.scene.playerUi.updatePlayerHp(this.scene.playerHp)
      if (this.scene.playerHp <= 0) {
        this.scene.sound.stopAll()
        this.scene.events.off('dragon:hit')
        this.scene.events.off('dragon:over')
        this.scene.events.off('dragon:out')
        this.scene.events.off('dragon:attackItem')
        this.scene.playerHp = this.scene.playerMaxHp
        this.scene.scene.start('GameOver');
      }


      this.scene.anims.create({
        key: 'animatedBite',
        frames: this.scene.anims.generateFrameNumbers('animatedBite', { start: 0, end: FRAME_COUNT - 1 }),
        frameRate: FRAME_RATE,
        repeat: 0 // Loop the animation
      });

      const randomAngle = Phaser.Math.Between(-45, 45);
      const biteSprite = this.scene.add.sprite(width / 2, height / 2, 'animatedBite')
        .setScale(30) // Adjust the scale as needed
        .setAngle(randomAngle)
        .setDepth(9999); // Ensure it's on top

      biteSprite.play('animatedBite');

      const redFlash = this.scene.add.graphics();
      redFlash.fillStyle(0xFF0000, 0.25); // Red color with 50% transparency
      redFlash.fillRect(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height);

      this.scene.tweens.add({
        targets: redFlash,
        alpha: 0,
        duration: 200,
        ease: 'Cubic.easeOut',
        onComplete: () => {
          redFlash.destroy(); // Remove the red flash after fading out
        }
      });

      biteSprite.on('animationcomplete', () => {
        biteSprite.destroy(); // Remove the bite sprite after the animation is complete
      });

    }



    this.lastAttackTime = this.scene.time.now; // Reset the timer for the next attack
  }


  getRandomSound() {
    return Phaser.Math.RND.pick(this.dragonSounds);
  }

  updateProgressBar() {
    if (this.scene.shield > 0) {
      this.barColor = 0x807a83
    } else {
      this.barColor = 0x8e22cf
    }
    this.attackBar.setFillStyle(this.barColor)
    const { width, height } = this.scene.cameras.main;
    const barWidth = width / 2

    if (this.lastAttackTime == 0) {
      this.lastAttackTime = this.scene.time.now
    }
    const elapsed = this.scene.time.now - this.lastAttackTime;
    let progress = elapsed / this.attackInterval;
    if (progress > 1) progress = 1

    this.attackBar.width = progress * (barWidth - 10);

  }

  update() {
    this.updateProgressBar();
  }

}