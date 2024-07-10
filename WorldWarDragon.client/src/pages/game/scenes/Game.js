import { computed } from "vue";
import { AppState } from "../../../AppState.js";
import { bossDamageService } from "../../../services/BossDamageService.js";
import { logger } from "../../../utils/Logger.js";
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
    }

    create() {
        this.cameras.main.setBackgroundColor(0xFFA500);

        this.background = this.add.image(0, 0, 'forestBackground')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.scale.on('resize', this.resize, this);

        this.dragon = this.add.sprite(512, 380, 'dragon_1').setOrigin(0.5, 0.5).setScale(4, 4)
        this.dragonHP = 100;
        this.bossDamage = 10; // Amount of damage to report to the boss

        this.dragon.setInteractive()
        this.dragon.on('pointerdown', () => {

            this.dragonHP -= 10
            this.clickText.setText(`HP: ${this.dragonHP}`)

            if (this.dragonHP <= 0) {
                this.updateBossHP({
                    dmg: this.bossDamage,
                    bossId: AppState.activeBoss.id
                })
                this.dragonHP = 100;
                this.scene.start('GameResults')
            }

        });

        this.clickText = this.add.text(16, 16, `HP: ${this.dragonHP}`, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })

        EventBus.emit('current-scene-ready', this);
    }

    updateBossHP(bossDamageData) {
        AppState.bossDamage = this.bossDamage
        logger.log('BossDamage', AppState.bossDamage)
        bossDamageService.createOrIncreaseBossDamage(bossDamageData)
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.resize(width, height);

        this.background.setDisplaySize(width, height);
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
