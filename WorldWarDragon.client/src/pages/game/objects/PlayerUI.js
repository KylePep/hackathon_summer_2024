export class PlayerUi {
  constructor(scene, playerName, playerHp, maxHp) {
    this.scene = scene;
    this.playerName = playerName;
    this.playerHp = playerHp;
    this.maxHp = maxHp;

    this.createUI();
    this.setScaleToFitWindow();
    this.scene.scale.on('resize', this.setScaleToFitWindow, this);
  }

  createUI() {
    const { width, height } = this.scene.cameras.main;

    // Create the UI container
    this.uiContainer = this.scene.add.container(0, 0);

    // Create the top bar
    this.topBar = this.scene.add.rectangle(width / 2, 0, width, 50, 0x000000).setOrigin(0.5, 0);
    this.uiContainer.add(this.topBar);

    // Add player name text
    this.playerNameText = this.scene.add.text(64, 10, this.playerName, {
      fontSize: '20px',
      fill: '#ffffff',
    });
    this.uiContainer.add(this.playerNameText);

    // Add colored number slots
    this.redNumberSlot = this.scene.add.text(200, 10, '0', {
      fontSize: '20px',
      fill: '#ff0000',
    });
    this.greenNumberSlot = this.scene.add.text(250, 10, '0', {
      fontSize: '20px',
      fill: '#00ff00',
    });
    this.blueNumberSlot = this.scene.add.text(300, 10, '0', {
      fontSize: '20px',
      fill: '#0000ff',
    });
    this.uiContainer.add(this.redNumberSlot);
    this.uiContainer.add(this.greenNumberSlot);
    this.uiContainer.add(this.blueNumberSlot);

    // Add player health bar
    this.healthBarBackground = this.scene.add.rectangle(10, 40, width - 20, 10, 0x555555).setOrigin(0, 0.5);
    this.healthBar = this.scene.add.rectangle(10, 40, (this.playerHp / this.maxHp) * (width - 20), 10, 0x00ff12).setOrigin(0, 0.5);
    this.uiContainer.add(this.healthBarBackground);
    this.uiContainer.add(this.healthBar);
  }

  setScaleToFitWindow() {
    const { width, height } = this.scene.cameras.main;

    // Update the top bar width
    this.topBar.width = width;

    // Update health bar width and position
    this.healthBarBackground.width = width - 20;
    this.healthBar.width = (this.playerHp / this.maxHp) * (width - 20);

    // Reposition elements
    this.topBar.setPosition(width / 2, 0);
    this.playerNameText.setPosition(64, 10);
    this.redNumberSlot.setPosition(width / 2 - 50, 10);
    this.greenNumberSlot.setPosition(width / 2, 10);
    this.blueNumberSlot.setPosition(width / 2 + 50, 10);
    this.healthBarBackground.setPosition(10, 40);
    this.healthBar.setPosition(10, 40);
  }

  updatePlayerHp(newHp) {
    this.playerHp = newHp;
    const { width } = this.scene.cameras.main;
    this.healthBar.width = (this.playerHp / this.maxHp) * (width - 20);
  }
}