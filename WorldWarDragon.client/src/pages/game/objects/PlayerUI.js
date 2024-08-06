import { AppState } from "../../../AppState.js";

export class PlayerUi {
  constructor(scene, account, playerHp, maxHp) {
    this.scene = scene;
    this.playerName = account.name;
    this.playerHp = playerHp;
    this.maxHp = maxHp;
    this.attack = account.attack
    this.attackAid = account.attackAid
    this.shield = account.shield
    this.shieldAid = account.shieldAid
    this.heal = account.heal
    this.healAid = account.healAid
    this.goldMod = 0
    this.healthMod = 0
    this.powerMod = 0
    this.luckMod = 0



    this.createUI();
    this.setScaleToFitWindow();
    this.scene.scale.on('resize', this.setScaleToFitWindow, this);
  }

  createUI() {
    const { width, height } = this.scene.cameras.main;

    this.activeRoomId = AppState.activeRoom.id
    if (this.activeRoomId == 5) {
      this.goldMod = 0
      this.healthMod = 0
      this.powerMod = 0
      this.luckMod = 0
    } else {
      this.goldMod = AppState.goldMod[this.activeRoomId]
      this.healthMod = AppState.healthMod[this.activeRoomId]
      this.powerMod = AppState.powerMod[this.activeRoomId]
      this.luckMod = AppState.luckMod[this.activeRoomId]
    }

    // Create the UI container
    this.uiContainer = this.scene.add.container(0, 0);

    const barWidth = width;
    const barHeight = 72;
    const borderColor = 0xFFFFFF; // White color
    const borderThickness = 16; // Thickness of the border

    // Create the top bar
    this.topBar = this.scene.add.rectangle(width / 2, 0, barWidth, barHeight, 0x000000).setOrigin(0.5, 0);
    this.uiContainer.add(this.topBar);

    // Create a Graphics object for the border
    const topBarBorder = this.scene.add.graphics();
    topBarBorder.lineStyle(borderThickness, borderColor);

    // Draw the border around the top bar
    topBarBorder.strokeRectShape(new Phaser.Geom.Rectangle(width / 2 - barWidth / 2, 0, barWidth, barHeight));

    // Add the border to the UI container behind the top bar
    this.uiContainer.addAt(topBarBorder, 0);
    // Add player name text
    this.playerNameText = this.scene.add.text(64, 10, this.playerName, {
      fontFamily: '"Press Start 2P"', fontSize: '16px', color: '#ffffff',
      stroke: '#000000', strokeThickness: 8,
      align: 'left'
    });
    this.uiContainer.add(this.playerNameText);

    // Add colored number slots
    this.redNumberSlot = this.scene.add.text(width / 2, 10, `${this.attack} | ${this.attackAid}`, {
      fontFamily: '"Press Start 2P"', fontSize: '16px',
      stroke: '#000000', strokeThickness: 8,
      align: 'left',
      fill: '#ff0000',
    }).setOrigin(0, 0);
    this.greenNumberSlot = this.scene.add.text(width * .75, 10, `${this.heal} | ${this.healAid}`, {
      fontFamily: '"Press Start 2P"', fontSize: '16px',
      stroke: '#000000', strokeThickness: 8,
      align: 'left',
      fill: '#00ff00',
    }).setOrigin(0.5, 0);
    this.blueNumberSlot = this.scene.add.text(width, 10, `${this.shield} | ${this.shieldAid}`, {
      fontFamily: '"Press Start 2P"', fontSize: '16px',
      stroke: '#000000', strokeThickness: 8,
      align: 'left',
      fill: '#0000ff',
    }).setOrigin(1, 0);
    this.uiContainer.add(this.redNumberSlot);
    this.uiContainer.add(this.greenNumberSlot);
    this.uiContainer.add(this.blueNumberSlot);

    // Add player health bar
    this.healthBarBackground = this.scene.add.rectangle(10, 40, width - 20, 10, 0x555555).setOrigin(0, 0.5);
    this.healthBar = this.scene.add.rectangle(10, 40, (this.playerHp / this.maxHp) * (width - 20), 10, 0x00ff12).setOrigin(0, 0.5);
    this.uiContainer.add(this.healthBarBackground);
    this.uiContainer.add(this.healthBar);

    this.stats = this.scene.add.text(0, 72, `HP: ${this.maxHp - this.healthMod}(${this.healthMod}) PWR: ${AppState.account.power} (${this.powerMod
      }) GLD: ${AppState.account.gold} (${this.goldMod}) VLR: ${AppState.account.valor} (${AppState.account.valor - AppState.account.valorSpent}) LCK: ${this.luckMod} `, {
      fontFamily: '"Press Start 2P"', fontSize: '10px',
      stroke: '#000000', strokeThickness: 8,
      align: 'left',
      fill: '#ffffff',
    }).setOrigin(0, 1);
    this.uiContainer.add(this.stats);

  }

  setScaleToFitWindow() {
    const { width, height } = this.scene.cameras.main;

    const fontSize = width < 768 ? '12px' : '16px';

    this.redNumberSlot.setFontSize(fontSize);
    this.greenNumberSlot.setFontSize(fontSize);
    this.blueNumberSlot.setFontSize(fontSize);

    // Update the top bar width
    this.topBar.width = width;

    // Update health bar width and position
    this.healthBarBackground.width = width - 20;
    this.healthBar.width = (this.playerHp / this.maxHp) * (width - 20);

    // Reposition elements
    this.topBar.setPosition(width / 2, 0);
    this.playerNameText.setPosition(64, 10);
    this.redNumberSlot.setPosition(width / 2, 10);
    this.greenNumberSlot.setPosition(width * .75, 10);
    this.blueNumberSlot.setPosition(width, 10);
    this.healthBarBackground.setPosition(10, 40);
    this.healthBar.setPosition(10, 40);
  }

  updatePlayerHp(newHp) {
    this.playerHp = newHp;
    const { width } = this.scene.cameras.main;
    this.healthBar.width = (this.playerHp / this.maxHp) * (width - 20);

  }
  updateItem() {
    this.redNumberSlot.setText(`${AppState.account.attack} | ${AppState.account.attackAid}`)
    this.greenNumberSlot.setText(`${AppState.account.heal} | ${AppState.account.healAid}`)
    this.blueNumberSlot.setText(`${AppState.account.shield} | ${AppState.account.shieldAid}`)
  }
}