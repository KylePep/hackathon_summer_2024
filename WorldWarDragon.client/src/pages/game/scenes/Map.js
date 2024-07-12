import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class Map extends Scene {
    constructor() {
        super('Map');
    }

    create() {
        this.cameras.main.setBackgroundColor(0xff4500);

        this.background = this.add.image(0, 0, 'map')
            .setOrigin(0, 0)
            .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        this.add.text(512, 384, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }

    resize(gameSize, baseSize, displaySize, resolution) {
        const width = gameSize.width;
        const height = gameSize.height;

        this.cameras.resize(width, height);

        this.background.setDisplaySize(width, height);

    }

    changeScene() {
        this.scene.start('MainMenu');
    }
}
