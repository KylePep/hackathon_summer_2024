import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";

export class Slash {
  constructor(scene, x, y) {
    this.scene = scene;


    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on('progress', (progress) => {

      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + (460 * progress);

    });

    // Interactive sprite for hover detection
    this.interactiveSlash = this.scene.add.sprite(x, y, 'star').setOrigin(0.5, 0.5);
    this.interactiveSlash.setInteractive();
    this.addInteractions();

    this.setScaleToFitWindow(0);
    this.scene.scale.on('resize', this.setScaleToFitWindow, this);
  }

  setScaleToFitWindow(modifier) {
    const { width, height } = this.scene.cameras.main;
    const slashWidth = this.interactiveSlash.width;
    const slashHeight = this.interactiveSlash.height;

    const scaleX = width / slashWidth;
    const scaleY = height / slashHeight;

    const scale = Math.min(scaleX, scaleY) * 0.25 + modifier;
    this.interactiveSlash.setScale(scale);
    this.displaySlash.setScale(scale);
  }


  addInteractions() {
    this.interactiveSlash.on('pointerdown', (pointer) => {
    });

    this.interactiveSlash.on('pointerover', (pointer) => {
    });

    this.interactiveSlash.on('pointerout', (pointer) => {
    });
  }

  destroy() {
    logger.log('destroy - slash');
    this.interactiveSlash.destroy();
  }
}