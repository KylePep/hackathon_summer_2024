import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { bossService } from "../../../services/BossService.js";
import { AppState } from "../../../AppState.js";
import Pop from "../../../utils/Pop.js";
import { accountService } from "../../../services/AccountService.js";
import { logger } from "../../../utils/Logger.js";
import { bossDamageService } from "../../../services/BossDamageService.js";

export class GameResults extends Scene {
    constructor() {
        super('GameResults');
    }


    create() {
        this.getBossData()
        this.cameras.main.setBackgroundColor(0xff4500);

        this.background = this.add.image(0, 0, 'darkDragonBG')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.updateBossHP()

        this.updateAccount()

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.title = this.add.text(centerX, centerY - 200, `${AppState.bossDamage} Damage dealt to ${AppState.activeBoss.name}`, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        const newBossHp = AppState.activeBoss.hp - AppState.activeBoss.damages - AppState.bossDamage;

        this.bossHp = this.add.text(centerX, centerY - 100, `${newBossHp} Hp remains`, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        this.rewards = this.add.text(centerX, centerY, `+${AppState.gold} Gold | +${AppState.valor} Valor `, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);


        this.fight = this.add.text(centerX, centerY + 100, 'FIGHT!', {
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

        this.return = this.add.text(centerX, centerY + 200, 'RETREAT...', {
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


        this.adjustTextSize();

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
        this.title.setPosition(centerX, centerY - 200)
        this.bossHp.setPosition(centerX, centerY - 100)
        this.rewards.setPosition(centerX, centerY)
        this.fight.setPosition(centerX, centerY + 100)
        this.return.setPosition(centerX, centerY + 200)

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

        this.title.setStyle({ fontSize: newFontSize });
        this.bossHp.setStyle({ fontSize: newFontSize });
        this.rewards.setStyle({ fontSize: newFontSize });
        this.fight.setStyle({ fontSize: newFontSize });
        this.return.setStyle({ fontSize: newFontSize });
    }

    getBossData() {
        bossService.getBosses();
    }

    async updateAccount() {
        try {
            const accountData = {}
            accountData.gold = AppState.gold
            accountData.valor = AppState.valor
            logger.log('GOLD VALOR', accountData)
            await accountService.editAccount(accountData)
        } catch (error) {
            Pop.error(error.message, '[]')
        }
    }

    async updateBossHP() {
        try {
            const bossDamageData = {}
            bossDamageData.dmg = AppState.bossDamage
            bossDamageData.bossId = AppState.activeBoss.id
            logger.log('BossDamage', AppState.bossDamage)
            await bossDamageService.createOrIncreaseBossDamage(bossDamageData)
        } catch (error) {
            Pop.error(error.message, '[]')
        }
    }
}
