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

        this.fight.on('pointerover', () => {
            this.fight.setColor('red')
            this.input.setDefaultCursor('pointer');
        })
        this.fight.on('pointerout', () => {
            this.fight.setColor('#ffffff')
            this.input.setDefaultCursor('default');
        })

        this.return = this.add.text(512, 500, 'RETREAT...', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100).setInteractive()

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

    getBossData() {
        bossService.getBosses();
    }
}
