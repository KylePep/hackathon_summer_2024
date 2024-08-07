import { logger } from "../../../utils/Logger.js";

export class Slash {
  constructor(scene, x, y) {
    this.scene = scene;

    this.slashes = [
      'small_0001', 'small_0004', 'small_0006', 'small_0010', 'small_0015',
      'small_0019', 'small_0020', 'small_0022', 'small_0026', 'small_0030',
      'small_0032', 'small_0034', 'small_0036', 'small_0037'
    ];
    // Interactive sprite for hover detection
    this.interactiveSlash = this.scene.add.sprite(x, y, 'star').setOrigin(0.5, 0.5);
    this.interactiveSlash.setAlpha(0.01); // Initially semi-transparent
    this.interactiveSlash.setInteractive();
    this.addInteractions();

    // Display sprite for visual changes
    this.displaySlash = this.scene.add.sprite(x, y, 'small_0001').setOrigin(0.5, 0.5);
    this.displaySlash.setAlpha(0); // Initially hidden


    this.setScaleToFitWindow(0);
    this.scene.scale.on('resize', this.setScaleToFitWindow, this);
  }

  setScaleToFitWindow(modifier) {
    const { width, height } = this.scene.cameras.main;
    const slashWidth = this.interactiveSlash.width;
    const slashHeight = this.interactiveSlash.height;

    const scaleX = width / slashWidth;
    const scaleY = height / slashHeight;

    const scale = Math.min(scaleX, scaleY) * 0.25 + modifier;
    this.interactiveSlash.setScale(scale);
    this.displaySlash.setScale(scale);
  }

  getRandomSlash() {
    return Phaser.Math.RND.pick(this.slashes);
  }

  getRandomDragonSound() {
    const dragonSounds = ['swish_2', 'swish_3', 'swish_4'];

    return Phaser.Math.RND.pick(dragonSounds);
  }

  addInteractions() {
    this.interactiveSlash.on('pointerdown', (pointer) => {
      this.scene.events.emit('dragon:hit', pointer);
    });

    this.interactiveSlash.on('pointerover', (pointer) => {
      this.entryState = 'enter';
      this.setScaleToFitWindow(0.2);

      this.scene.events.emit('dragon:over', pointer);
    });

    this.interactiveSlash.on('pointerout', (pointer) => {
      this.displaySlash.setTexture(this.getRandomSlash());
      this.setScaleToFitWindow(0);
      this.displaySlash.setAngle(Phaser.Math.RND.between(0, 180));
      this.displaySlash.setAlpha(1); // Make the sprite visible
      this.fadeOutSprite(); // Start the fade-out animation

      this.scene.events.emit('dragon:out', pointer);

      if (this.entryState === 'enter') {
        this.entryState = 'exit';

        this.scene.events.emit('dragon:hit', pointer);
      }
    });
  }

  fadeOutSprite() {
    this.scene.tweens.add({
      targets: this.displaySlash,
      alpha: 0, // Fade out to fully transparent
      duration: 300, // Duration of the fade-out effect in milliseconds
      ease: 'Linear',
      onStart: () => {
        this.displaySlash.alpha = 1
      }
    });
  }

  destroy() {

    // Remove event listeners
    this.interactiveSlash.off('pointerdown');
    this.interactiveSlash.off('pointerover');
    this.interactiveSlash.off('pointerout');

    // Destroy the hitbox and the sprite
    this.hitbox.destroy();
    this.interactiveSlash.destroy();
  }
}