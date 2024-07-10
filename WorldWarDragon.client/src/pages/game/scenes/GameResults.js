import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { bossService } from "../../../services/BossService.js";
import { AppState } from "../../../AppState.js";
import { router } from "../../../router.js";

export class GameResults extends Scene {
    constructor() {
        super('GameResults');
    }


    create() {
        this.getBossData()
        this.cameras.main.setBackgroundColor(0xff4500);

        // this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.text(512, 200, 'Game Results', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const newBossHp = AppState.activeBoss.hp - AppState.activeBoss.damages - AppState.bossDamage;

        this.add.text(512, 300, `Boss Dragon HP ${newBossHp}`, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);


        this.fight = this.add.text(512, 400, 'FIGHT!', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive()

        this.fight.on('pointerdown', () => {
            this.scene.start('Game')
        })

        this.return = this.add.text(512, 500, 'RETREAT...', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive()

        this.return.on('pointerdown', () => {
            router.push('/')
        })

        EventBus.emit('current-scene-ready', this);
    }

    getBossData() {
        bossService.getBosses();
    }
}
