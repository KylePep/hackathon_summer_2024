import { logger } from "../../../utils/Logger.js";
import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Game extends Scene {
    constructor() {
        super('Game');
        // this.updateBossHP = updateBossHP;
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
            console.log(this.dragonHP)
            if (this.dragonHP <= 0) {
                // this.updateBossHP(this.bossDamage)
                this.dragonHP = 100;
            }
        });

        this.clickText = this.add.text(16, 16, `HP: ${this.dragonHP}`, {
            fontSize: `32px`,
            fill: '#000'
        })

        EventBus.emit('current-scene-ready', this);
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
