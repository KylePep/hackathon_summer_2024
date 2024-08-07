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

        this.activeRoomId = AppState.activeRoom.id
        if (this.activeRoomId && this.activeRoomId != 5) {
            this.playerMaxHp = AppState.account.health + AppState.healthMod[this.activeRoomId]
        } else {
            this.playerMaxHp = AppState.account.health
        }
        this.playerHp = this.playerMaxHp

        const dragonNames = DRAGON_NAMES.find((data) => data.id === this.activeRoomId);
        const dragonTitles = DRAGON_TITLES.find((data) => data.id === this.activeRoomId);
        const backGrounds = ['beachBG', 'forestBG', 'mountainBG', 'cliffBG', 'islandBG',]



        // Randomly select a name and title
        const randomName = Phaser.Math.RND.pick(dragonNames.names);
        const randomTitle = Phaser.Math.RND.pick(dragonTitles.titles);

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

        this.scale.on('resize', this.resize, this);
        this.resize({ width: this.scale.width, height: this.scale.height });

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
    }

    leaveRoom() {
        this.sound.stopAll()
        this.scene.start('GameResults')
    }

    changeScene() {
        this.scene.start('GameOver');
    }

    update() {
        this.dragonAttack.update();
    }
}
