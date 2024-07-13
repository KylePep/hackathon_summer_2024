import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { useRouter } from "vue-router";
import { DRAGON_NAMES } from '../../../../../shared/constants/index.js'
import { DRAGON_TITLES } from '../../../../../shared/constants/index.js'
import { Dragon } from "../objects/dragon.js";
import { Slash } from "../objects/slash.js";
import { AppState } from "../../../AppState.js";
import { Item } from "../objects/items.js";

export class Game extends Scene {
    constructor() {
        super('Game');
        this.router = useRouter()


    }

    create() {

        const dragonNames = DRAGON_NAMES
        const dragonTitles = DRAGON_TITLES
        const backGrounds = ['beachBG', 'forestBG', 'mountainBG', 'cliffBG', 'islandBG',]


        // Randomly select a name and title
        const randomName = Phaser.Math.RND.pick(dragonNames);
        const randomTitle = Phaser.Math.RND.pick(dragonTitles);

        this.cameras.main.setBackgroundColor(0xFFA500);

        this.background = this.add.image(0, 0, backGrounds[AppState.activeRoom.id - 1])
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.scale.on('resize', this.resize, this);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.dragon = new Dragon(this, centerX, centerY)

        this.item = new Item(this, centerX, centerY);


        this.slash = new Slash(this, centerX, centerY)

        this.clickText = this.add.text(128, 16, `HP: ${this.dragon.dragonHP}`, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })

        // Adding the 'NAME' text at the top right
        const topRightX = this.cameras.main.width - 32; // Offset from the left edge
        const topRightY = 16; // Offset from the bottom edge
        this.name = this.add.text(topRightX, topRightY, `${randomName} ${randomTitle}`, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8
        }).setDepth(100).setOrigin(1, 0)

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
        this.dragon.setPosition(centerX, centerY);

        // Reposition the 'RETREAT...' text at the bottom left on resize
        const bottomLeftX = 128; // Offset from the left edge
        const bottomLeftY = height - 96; // Offset from the bottom edge
        this.return.setPosition(bottomLeftX, bottomLeftY);

        const topRightX = this.cameras.main.width - 400; // Offset from the left edge
        const topRightY = 96; // Offset from the bottom edge
        this.name.setPosition(topRightX, topRightY);

        this.adjustTextSize();
    }

    leaveRoom() {

        this.scene.start('GameResults')
    }

    setFontToFitWindow() {
        const { width, height } = this.cameras.main;
        const baseFontSize = 64;
        const scaleFactor = Math.min(width / 1600, height / 1200);
        return baseFontSize * scaleFactor;
    }
    adjustTextSize() {
        const newFontSize = `${this.setFontToFitWindow()}px`;

        this.clickText.setStyle({ fontSize: newFontSize });
        this.name.setStyle({ fontSize: newFontSize });
        this.return.setStyle({ fontSize: newFontSize });
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
