import { computed } from "vue";
import { AppState } from "../../../AppState.js";
import { bossDamageService } from "../../../services/BossDamageService.js";
import { logger } from "../../../utils/Logger.js";
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import { useRouter } from "vue-router";

export class Game extends Scene {
    constructor() {
        super('Game');
        this.router = useRouter()
    }

    create() {
        this.cameras.main.setBackgroundColor(0xFFA500);

        this.background = this.add.image(0, 0, 'forestBackground')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.scale.on('resize', this.resize, this);

        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;

        this.dragon = this.add.sprite(centerX, centerY, 'dragon_1').setOrigin(0.5, 0.5).setScale(4, 4)
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

        this.dragon.on('pointerover', () => {
            this.dragon.setTint(0x00ff00);
            this.dragon.setScale(4.2);
            this.dragon.y -= 8;
            this.input.setDefaultCursor('pointer');
        });

        this.dragon.on('pointerout', () => {
            this.dragon.clearTint();
            this.dragon.setScale(4);
            this.dragon.y += 8;
            this.input.setDefaultCursor('default');
        });

        this.clickText = this.add.text(128, 16, `HP: ${this.dragonHP}`, {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        })

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

        // Re-center the dragon sprite on resize
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        this.dragon.setPosition(centerX, centerY);

        // Reposition the 'RETREAT...' text at the bottom left on resize
        const bottomLeftX = 128; // Offset from the left edge
        const bottomLeftY = height - 96; // Offset from the bottom edge
        this.return.setPosition(bottomLeftX, bottomLeftY);
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
