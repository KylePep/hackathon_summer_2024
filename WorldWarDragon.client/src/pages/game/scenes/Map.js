import { AppState } from "../../../AppState.js";
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { MAP_DATA } from '../../../../../shared/constants/index.js'

export class Map extends Scene {
    constructor() {
        super('Map');
    }

    create() {
        AppState.winStreak = 0

        // Create and play the background music
        this.backgroundMusic = this.sound.add('DragonKingDungeon', {
            volume: 0.5, // Adjust the volume
            loop: true   // Loop the music
        });

        this.backgroundMusic.play();


        // Your existing code to setup the game objects, etc.

        this.cameras.main.setBackgroundColor(0xff4500);

        this.background = this.add.image(0, 0, 'mapBG')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.createButtons();
        this.scale.on('resize', this.resize, this);

        EventBus.emit('current-scene-ready', this);
    }

    createButtons() {
        const fontSize = this.getFontSize();

        this.topLeftButton = this.add.text(0, 0, 'Toleftios\nEasy', {
            fontFamily: '"Press Start 2P"', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0, 0).setInteractive().on('pointerdown', () => this.buttonAction('Top Left', 1)).on('pointerover', () => this.buttonOver(this.topLeftButton)).on('pointerout', () => this.buttonOut(this.topLeftButton));

        this.topRightButton = this.add.text(0, 0, 'Rysto\nMedium', {
            fontFamily: '"Press Start 2P"', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(1, 0).setInteractive().on('pointerdown', () => this.buttonAction('Top Right', 2)).on('pointerover', () => this.buttonOver(this.topRightButton)).on('pointerout', () => this.buttonOut(this.topRightButton));

        this.centerButton = this.add.text(0, 0, 'Centeria\nSafe', {
            fontFamily: '"Press Start 2P"', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setInteractive().on('pointerdown', () => this.buttonAction('Center', 5)).on('pointerover', () => this.buttonOver(this.centerButton)).on('pointerout', () => this.buttonOut(this.centerButton));

        this.bottomRightButton = this.add.text(0, 0, 'Boghir\nExtreme', {
            fontFamily: '"Press Start 2P"', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(1, 1).setInteractive().on('pointerdown', () => this.buttonAction('Bottom Right', 4)).on('pointerover', () => this.buttonOver(this.bottomRightButton)).on('pointerout', () => this.buttonOut(this.bottomRightButton));

        this.bottomLeftButton = this.add.text(0, 0, 'Lendbom\nHard', {
            fontFamily: '"Press Start 2P"', fontSize: 32, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0, 1).setInteractive().on('pointerdown', () => this.buttonAction('Bottom Left', 3)).on('pointerover', () => this.buttonOver(this.bottomLeftButton)).on('pointerout', () => this.buttonOut(this.bottomLeftButton));

        this.resize();
    }

    positionButtons() {
        const { width, height } = this.cameras.main;
        const vMargin = 96;
        const minHMargin = 32;
        const maxHMargin = 96;

        // Calculate hMargin based on screen width, ensuring it stays within minHMargin and maxHMargin
        const hMargin = Math.min(maxHMargin, Math.max(minHMargin, width * 0.1));

        this.topLeftButton.setPosition(hMargin, vMargin);
        this.topRightButton.setPosition(width - hMargin, vMargin);
        this.centerButton.setPosition(width / 2, height / 2);
        this.bottomRightButton.setPosition(width - hMargin, height - vMargin);
        this.bottomLeftButton.setPosition(hMargin, height - vMargin);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const { width, height } = this.cameras.main;

        this.cameras.resize(width, height);
        this.background.setDisplaySize(width, height);

        // Adjust the font size of buttons based on new screen size
        const fontSize = this.getFontSize();
        this.topLeftButton.setFontSize(fontSize);
        this.topRightButton.setFontSize(fontSize);
        this.centerButton.setFontSize(fontSize);
        this.bottomRightButton.setFontSize(fontSize);
        this.bottomLeftButton.setFontSize(fontSize);

        this.positionButtons();
    }

    getFontSize() {
        const { width, height } = this.cameras.main;
        const baseFontSize = 32; // Base font size
        const scaleFactor = Math.min(width / 800, height / 600); // Adjust based on your desired base dimensions
        return baseFontSize * scaleFactor;
    }

    buttonAction(buttonName, roomId) {
        AppState.activeRoom = MAP_DATA.find((m) => m.id == roomId);
        this.changeScene()
    }
    buttonOver(button) {
        button.setColor('gray');
        this.input.setDefaultCursor('pointer');
    }
    buttonOut(button) {
        button.setColor('white');
        this.input.setDefaultCursor('default');
    }
    changeScene() {
        this.scene.start('Game');
    }
}


