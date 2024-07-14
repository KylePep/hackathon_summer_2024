import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class GameOver extends Scene {
    constructor() {
        super('GameOver');
    }

    create() {

        // Create and play the background music
        this.backgroundMusic = this.sound.add('gameOverBGM', {
            volume: 0.5, // Adjust the volume
            loop: true   // Loop the music
        });

        this.backgroundMusic.play();

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

        this.fight = this.add.text(centerX, centerY + 100, 'FIGHT!', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive();

        this.fight.on('pointerdown', () => {
            this.sound.stopAll()
            this.scene.start('Map');
        });

        this.fight.on('pointerover', () => {
            this.fight.setColor('red');
            this.input.setDefaultCursor('pointer');
        });

        this.fight.on('pointerout', () => {
            this.fight.setColor('#ffffff');
            this.input.setDefaultCursor('default');
        });

        this.return = this.add.text(centerX, centerY + 200, 'RETREAT...', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive();

        this.return.on('pointerdown', () => {
            EventBus.emit('navigate-home');
        });

        this.return.on('pointerover', () => {
            this.return.setColor('white');
            this.input.setDefaultCursor('pointer');
        });

        this.return.on('pointerout', () => {
            this.return.setColor('gray');
            this.input.setDefaultCursor('default');
        });

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
        this.fight.setPosition(centerX, centerY + 100);
        this.return.setPosition(centerX, centerY + 200);

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
