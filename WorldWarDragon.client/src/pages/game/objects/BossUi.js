// BossUi
import { EventBus } from '../EventBus.js';

export class BossUi {
  constructor(scene, bossName, bossTitle, bossHp, maxHp) {
    this.scene = scene;
    this.bossName = bossName;
    this.bossTitle = bossTitle;
    this.bossHp = bossHp;
    this.maxHp = maxHp;

    this.createUI();
    this.setScaleToFitWindow();
    this.scene.scale.on('resize', this.setScaleToFitWindow, this);
  }

  createUI() {
    const { width, height } = this.scene.cameras.main;

    // Create the UI container
    this.bossUiContainer = this.scene.add.container(0, height);

    const barWidth = width;
    const barHeight = 80;
    const borderColor = 0xFFFFFF; // White color
    const borderThickness = 16; // Thickness of the border

    // Create the bottom bar
    this.bottomBar = this.scene.add.rectangle(width / 2, 0, barWidth, barHeight, 0x000000).setOrigin(0.5, 1)
    this.bossUiContainer.add(this.bottomBar);

    // Create a Graphics object for the border
    const bottomBarBorder = this.scene.add.graphics();
    bottomBarBorder.lineStyle(borderThickness, borderColor);

    // Draw the border around the top bar
    bottomBarBorder.strokeRectShape(new Phaser.Geom.Rectangle(width / 2 - barWidth / 2, -barHeight, barWidth, barHeight));

    this.bossUiContainer.addAt(bottomBarBorder, 0);

    // Add retreat button
    this.retreatButton = this.scene.add.text(10, - 40, 'RETREAT...', {
      fontFamily: '"Press Start 2P"', fontSize: '16px', color: 'white',
      stroke: '#000000', strokeThickness: 8,
      align: 'left'
    }).setOrigin(0, 1).setDepth(400).setInteractive();
    this.retreatButton.on('pointerdown', () => {
      EventBus.emit('navigate-home');
    });
    this.retreatButton.on('pointerover', () => {
      this.retreatButton.setColor('gray')
      this.scene.input.setDefaultCursor('pointer');
    })
    this.retreatButton.on('pointerout', () => {
      this.retreatButton.setColor('white')
      this.scene.input.setDefaultCursor('default');
    })
    this.bossUiContainer.add(this.retreatButton);

    // Add boss name text
    this.bossNameText = this.scene.add.text(width / 2, - 40, this.bossName, {
      fontFamily: '"Press Start 2P"', fontSize: '20px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'left'
    }).setOrigin(0.5, 1).setDepth(400);
    this.bossUiContainer.add(this.bossNameText);

    // Add boss title text
    this.bossTitleText = this.scene.add.text(width / 2, - 20, this.bossTitle, {
      fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'left'
    }).setOrigin(0.5, 1).setDepth(400);
    this.bossUiContainer.add(this.bossTitleText);

    // Add boss health bar
    this.healthBarBackground = this.scene.add.rectangle(10, - 10, width - 20, 10, 0x555555).setOrigin(0, 1);
    this.healthBar = this.scene.add.rectangle(10, - 10, (this.bossHp / this.maxHp) * (width - 20), 10, 0xff0000).setOrigin(0, 1).setDepth(400);
    this.bossUiContainer.add(this.healthBarBackground);
    this.bossUiContainer.add(this.healthBar);
  }

  setScaleToFitWindow() {
    const { width, height } = this.scene.cameras.main;

    const fontSize = width < 768 ? '12px' : '16px';
    const specialFontSize = width < 768 ? '16px' : '20px';

    this.retreatButton.setFontSize(fontSize);
    this.bossNameText.setFontSize(specialFontSize);
    this.bossTitleText.setFontSize(fontSize);

    // Update the bottom bar width
    this.bottomBar.width = width;

    // Update health bar width and position
    this.healthBarBackground.width = width - 20;
    this.healthBar.width = (this.bossHp / this.maxHp) * (width - 20);

    // Reposition elements
    this.bottomBar.setPosition(width / 2, 0);
    this.retreatButton.setPosition(10, - 40);
    this.bossNameText.setPosition(width / 2, - 40);
    this.bossTitleText.setPosition(width / 2, - 20);
    this.healthBarBackground.setPosition(10, - 10);
    this.healthBar.setPosition(10, - 10);
    console.log(width, height)
    console.log('bossUiContainer', this.bossUiContainer)
    console.log('bottomBar', this.bottomBar.x, this.bottomBar.y)
    console.log('retreatButton', this.retreatButton.x, this.retreatButton.y)
    console.log('bossNameText', this.bossNameText.x, this.bossNameText.y)
    console.log('bossTitleText', this.bossTitleText.x, this.bossTitleText.y)
    console.log('healthBar', this.healthBar.x, this.healthBar.y)
  }

  updateBossHp(newHp) {
    this.bossHp = newHp;
    const { width } = this.scene.cameras.main;
    this.healthBar.width = (this.bossHp / this.maxHp) * (width - 20);
  }
}