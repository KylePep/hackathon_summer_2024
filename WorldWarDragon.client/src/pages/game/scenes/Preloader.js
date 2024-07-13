import { Scene } from 'phaser';

export class Preloader extends Scene {
    constructor() {
        super('Preloader');
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        // this.background = this.add.image(0, 0, 'background')
        //     .setOrigin(0, 0)
        //     .setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        // this.scale.on('resize', this.resize, this);

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.audio('DragonKingDungeon', 'bgm/DragonKingDungeon.mp3');

        this.load.audio('dragonAttack_1', 'sound/mnstr5.wav');
        this.load.audio('dragonAttack_2', 'sound/mnstr6.wav');
        this.load.audio('dragonAttack_3', 'sound/mnstr8.wav');
        this.load.audio('dragonAttack_4', 'sound/mnstr13.wav');
        this.load.audio('dragonAttack_5', 'sound/mnstr14.wav');

        this.load.audio('swish_2', 'sound/swish_2.wav');
        this.load.audio('swish_3', 'sound/swish_3.wav');
        this.load.audio('swish_4', 'sound/swish_4.wav');
        this.load.audio('swish_3', 'sound/swish_3.wav');
        this.load.audio('attackItem', 'sound/magic1.wav');
        this.load.audio('healItem', 'sound/spell.wav');

        this.load.image('star', 'star.png');

        this.load.image('castleGroundBG', 'castleGrounds.jpeg');
        this.load.image('darkDragonBG', 'darkDragon.jpeg');
        this.load.image('mapBG', 'map4.jpeg');

        this.load.image('beachBG', 'room/beach.jpg');
        this.load.image('cliffBG', 'room/cliff.jpg');
        this.load.image('forestBG', 'room/forest.jpg');
        this.load.image('islandBG', 'castleGrounds.jpeg');
        this.load.image('mountainBG', 'room/mountain.jpg');

        this.load.image('dragon', 'dragon_2.png');

        this.load.image('dragon_1', 'dragon/dragon_1.gif');
        this.load.image('dragon_2', 'dragon/dragon_2.png');
        this.load.image('dragon_3', 'dragon/dragon_3.png');
        this.load.image('dragon_4', 'dragon/dragon_4.png');
        this.load.image('dragon_5', 'dragon/dragon_5.png');

        this.load.image('small_0001', 'battle/small_0001.png');
        this.load.image('small_0004', 'battle/small_0004.png');
        this.load.image('small_0006', 'battle/small_0006.png');
        this.load.image('small_0010', 'battle/small_0010.png');
        this.load.image('small_0015', 'battle/small_0015.png');
        this.load.image('small_0019', 'battle/small_0019.png');
        this.load.image('small_0020', 'battle/small_0020.png');
        this.load.image('small_0022', 'battle/small_0022.png');
        this.load.image('small_0026', 'battle/small_0026.png');
        this.load.image('small_0030', 'battle/small_0030.png');
        this.load.image('small_0032', 'battle/small_0032.png');
        this.load.image('small_0034', 'battle/small_0034.png');
        this.load.image('small_0036', 'battle/small_0036.png');
        this.load.image('small_0037', 'battle/small_0037.png');
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('Map');
    }

    // resize(gameSize, baseSize, displaySize, resolution) {
    //     const width = gameSize.width;
    //     const height = gameSize.height;

    //     this.cameras.resize(width, height);

    //     this.background.setDisplaySize(width, height);

    // }
}
