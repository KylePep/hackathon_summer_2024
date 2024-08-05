import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { useRouter } from "vue-router";
import { DRAGON_NAMES } from '../../../../../shared/constants/index.js'
import { DRAGON_TITLES } from '../../../../../shared/constants/index.js'
import { Dragon } from "../objects/dragon.js";
import { Slash } from "../objects/slash.js";
import { AppState } from "../../../AppState.js";
import { Item } from "../objects/items.js";
import { DragonAttack } from "../objects/dragonAttack.js";
import { logger } from "../../../utils/Logger.js";
import { BossUi } from "../objects/BossUi.js";
import { PlayerUi } from "../objects/PlayerUI.js";

export class Game extends Scene {
    constructor() {
        super('Game');
        this.router = useRouter()

        this.timerInterval = 1000;


    }

    create() {



        this.timerEvent = this.time.addEvent({
            delay: this.timerInterval,
            callback: this.onTimerEvent,
            callbackScope: this,
            loop: true
        });

        const dragonNames = DRAGON_NAMES
        const dragonTitles = DRAGON_TITLES
        const backGrounds = ['beachBG', 'forestBG', 'mountainBG', 'cliffBG', 'islandBG',]


        this.activeRoomId = AppState.activeRoom.id
        if (this.activeRoomId && this.activeRoomId != 5) {
            this.playerMaxHp = AppState.account.health + AppState.healthMod[this.activeRoomId]
        } else {
            this.playerMaxHp = AppState.account.health
        }
        this.playerHp = this.playerMaxHp

        // Randomly select a name and title
        const randomName = Phaser.Math.RND.pick(dragonNames);
        const randomTitle = Phaser.Math.RND.pick(dragonTitles);

        this.cameras.main.setBackgroundColor(0xFFA500);

        this.background = this.add.image(0, 0, backGrounds[AppState.activeRoom.id - 1])
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);



        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.dragon = new Dragon(this, centerX, centerY)

        this.bossUi = new BossUi(this, randomName, randomTitle, this.dragon.dragonHP, this.dragon.dragonHPMax)

        this.playerUi = new PlayerUi(this, AppState.account, this.playerHp, this.playerMaxHp)

        this.item = new Item(this, centerX, centerY);


        this.dragonAttack = new DragonAttack(this, this.dragon);
        this.dragonAttack.startAttack();

        this.slash = new Slash(this, centerX, centerY)

        // const topLeftX = 128; // Offset from the left edge
        // const topLeftY = 16; // Offset from the bottom edge

        // this.playerText = this.add.text(topLeftX, topLeftY, `${AppState.account.name}\nHP: ${this.playerHp}`, {
        //     fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'left'
        // }).setOrigin(0, 0)

        // Adding the 'NAME' text at the top right
        // const topRightX = this.cameras.main.width - 32; // Offset from the left edge
        // const topRightY = 16; // Offset from the bottom edge
        // this.name = this.add.text(topRightX, topRightY, `${randomName}\n ${randomTitle}`, {
        //     fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'right'
        // }).setDepth(100).setOrigin(1, 0)

        // this.clickText = this.add.text(topRightX, topRightY + 96, `HP: ${this.dragon.dragonHP}`, {
        //     fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
        //     stroke: '#000000', strokeThickness: 8,
        //     align: 'center'
        // }).setOrigin(1, 0)

        // Adding the 'RETREAT...' text at the bottom left
        // const bottomLeftX = 128; // Offset from the left edge
        // const bottomLeftY = this.cameras.main.height - 96; // Offset from the bottom edge
        // this.return = this.add.text(bottomLeftX, bottomLeftY, 'RETREAT...', {
        //     fontFamily: 'Arial Black', fontSize: 64, color: 'gray',
        //     stroke: '#000000', strokeThickness: 8, align: 'left'
        // }).setDepth(100).setInteractive()

        // this.return.on('pointerdown', () => {
        //     EventBus.emit('navigate-home');
        // });
        // this.return.on('pointerover', () => {
        //     this.return.setColor('white')
        //     this.input.setDefaultCursor('pointer');
        // })
        // this.return.on('pointerout', () => {
        //     this.return.setColor('gray')
        //     this.input.setDefaultCursor('default');
        // })

        this.scale.on('resize', this.resize, this);
        this.resize({ width: this.scale.width, height: this.scale.height });

        // this.adjustTextSize()

        EventBus.emit('current-scene-ready', this);
    }

    onTimerEvent() {
        // Actions to perform on each timer tick
        // For example, you can call a function on the dragon object
        if (this.dragon) {
            this.dragonAttack.update();
        }
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.resize(width, height);

        this.background.setDisplaySize(width, height);

        // // Re-center the dragon sprite on resize
        // const centerX = this.cameras.main.centerX;
        // const centerY = this.cameras.main.centerY;
        // // this.dragon.setPosition(centerX, centerY);
        // this.dragonAttack.updatePosition();
        // this.dragonAttack.setProgressBarSize(width * 0.25, 10);

        // Reposition the 'RETREAT...' text at the bottom left on resize
        // const bottomLeftX = 128; // Offset from the left edge
        // const bottomLeftY = height - 96; // Offset from the bottom edge
        // this.return.setPosition(bottomLeftX, bottomLeftY);

        // const topRightX = this.cameras.main.width; // Offset from the left edge
        // const topRightY = 16; // Offset from the bottom edge
        // this.name.setPosition(topRightX - 16, topRightY);
        // this.clickText.setPosition(topRightX - 16, topRightY + 128)

        // this.adjustTextSize();
    }

    leaveRoom() {
        this.sound.stopAll()
        this.scene.start('GameResults')
    }

    // setFontToFitWindow() {
    //     const { width, height } = this.cameras.main;
    //     const baseFontSize = 64;
    //     const scaleFactor = Math.min(width / 1600, height / 1200);
    //     return baseFontSize * scaleFactor;
    // }
    // adjustTextSize() {
    //     const newFontSize = `${this.setFontToFitWindow()}px`;

    //     this.clickText.setStyle({ fontSize: newFontSize });
    //     this.name.setStyle({ fontSize: newFontSize });
    //     this.return.setStyle({ fontSize: newFontSize });
    //     // this.playerText.setStyle({ fontSize: newFontSize });
    // }

    changeScene() {
        this.scene.start('GameOver');
    }

    update() {
        // Your update logic
        this.dragonAttack.update();
    }
}
