// BossUi

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

    // Create the bottom bar
    this.bottomBar = this.scene.add.rectangle(width / 2, 0, width, 80, 0x000000).setOrigin(0.5, 1);
    this.bossUiContainer.add(this.bottomBar);

    // Add retreat button
    this.retreatButton = this.scene.add.text(10, - 40, 'retreat...', {
      fontSize: '20px',
      fill: '#ffffff',
    }).setOrigin(0, 1).setInteractive();
    this.retreatButton.on('pointerdown', () => {
      EventBus.emit('navigate-home');
    });
    this.retreatButton.on('pointerover', () => {
      this.retreatButton.setColor('white')
      this.input.setDefaultCursor('pointer');
    })
    this.retreatButton.on('pointerout', () => {
      this.retreatButton.setColor('gray')
      this.input.setDefaultCursor('default');
    })
    this.bossUiContainer.add(this.retreatButton);

    // Add boss name text
    this.bossNameText = this.scene.add.text(width / 2, - 40, this.bossName, {
      fontSize: '20px',
      fill: '#ffffff',
    }).setOrigin(0.5, 1);
    this.bossUiContainer.add(this.bossNameText);

    // Add boss title text
    this.bossTitleText = this.scene.add.text(width / 2, - 20, this.bossTitle, {
      fontSize: '16px',
      fill: '#ffffff',
    }).setOrigin(0.5, 1);
    this.bossUiContainer.add(this.bossTitleText);

    // Add boss health bar
    this.healthBarBackground = this.scene.add.rectangle(10, - 10, width - 20, 10, 0x555555).setOrigin(0, 1);
    this.healthBar = this.scene.add.rectangle(10, - 10, (this.bossHp / this.maxHp) * (width - 20), 10, 0xff0000).setOrigin(0, 1);
    this.bossUiContainer.add(this.healthBarBackground);
    this.bossUiContainer.add(this.healthBar);
  }

  setScaleToFitWindow() {
    const { width, height } = this.scene.cameras.main;

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