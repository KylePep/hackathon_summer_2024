import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {
        this.cameras.main.setBackgroundColor(0xff4500);

        this.background = this.add.image(0, 0, 'gameOverBG')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.gameOver = this.add.text(centerX, centerY, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        // Adding the 'RETREAT...' text at the bottom left
        const bottomLeftX = 128; // Offset from the left edge
        const bottomLeftY = this.cameras.main.height - 96; // Offset from the bottom edge
        this.return = this.add.text(bottomLeftX, bottomLeftY, 'RETREAT...', {
            fontFamily: 'Arial Black', fontSize: 64, color: 'gray',
            stroke: '#000000', strokeThickness: 8, align: 'left'
        }).setDepth(100).setInteractive()

        this.return.on('pointerdown', () => {
            EventBus.emit('navigate-home');
        });
        this.return.on('pointerover', () => {
            this.return.setColor('white')
            this.input.setDefaultCursor('pointer');
        })
        this.return.on('pointerout', () => {
            this.return.setColor('gray')
            this.input.setDefaultCursor('default');
        })

        this.scale.on('resize', this.resize, this);
        this.resize({ width: this.scale.width, height: this.scale.height });

        this.adjustTextSize()

        EventBus.emit('current-scene-ready', this);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.resize(width, height);

        this.background.setDisplaySize(width, height);

        // Re-center the dragon sprite on resize
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        this.gameOver.setPosition(centerX, centerY)

        // Reposition the 'RETREAT...' text at the bottom left on resize
        const bottomLeftX = 128; // Offset from the left edge
        const bottomLeftY = height - 96; // Offset from the bottom edge
        this.return.setPosition(bottomLeftX, bottomLeftY);

        const topRightX = this.cameras.main.width; // Offset from the left edge
        const topRightY = 16; // Offset from the bottom edge

        this.adjustTextSize();
    }

    setFontToFitWindow() {
        const { width, height } = this.cameras.main;
        const baseFontSize = 64;
        const scaleFactor = Math.min(width / 1600, height / 1200);
        return baseFontSize * scaleFactor;
    }
    adjustTextSize() {
        const newFontSize = `${this.setFontToFitWindow()}px`;

        this.return.setStyle({ fontSize: newFontSize });
    }


    changeScene() {
        this.scene.start('MainMenu');
    }
}
