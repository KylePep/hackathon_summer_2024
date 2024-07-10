import { computed } from "vue";
import { AppState } from "../../../AppState.js";
import { bossDamageService } from "../../../services/BossDamageService.js";
import { logger } from "../../../utils/Logger.js";
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { useRouter } from "vue-router";
import { DRAGON_NAMES } from '../../../../../shared/constants/index.js'
import { DRAGON_TITLES } from '../../../../../shared/constants/index.js'
import { Dragon } from "../objects/dragon.js";

export class Game extends Scene {
    constructor() {
        super('Game');
        this.router = useRouter()

    }

    create() {

        const dragonNames = DRAGON_NAMES
        const dragonTitles = DRAGON_TITLES


        // Randomly select a name and title
        const randomName = Phaser.Math.RND.pick(dragonNames);
        const randomTitle = Phaser.Math.RND.pick(dragonTitles);

        this.cameras.main.setBackgroundColor(0xFFA500);

        this.background = this.add.image(0, 0, 'forestBackground')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.scale.on('resize', this.resize, this);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.dragon = new Dragon(this, centerX, centerY)
        console.log(this.dragon.dragonHP)

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
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
