import { logger } from "../../../utils/Logger.js";
import { AppState } from "../../../AppState.js";
import { bossDamageService } from "../../../services/BossDamageService.js";

export class Dragon {
  constructor(scene, x, y) {
    this.scene = scene;
    this.dragonHP = this.getRandomDragonHP();
    this.dragonHPMax = this.dragonHP
    this.bossDamage = Phaser.Math.RoundTo((.1 * this.dragonHP), 0);

    this.activeRoomId = AppState.activeRoom.id
    if (this.activeRoomId && this.activeRoomId != 5) {
      this.goldMod = AppState.goldMod[this.activeRoomId]
    } else {
      this.goldMod = 0
    }
    this.modifier = Phaser.Math.RND.pick([1.1, .9])
    this.gold = Phaser.Math.RoundTo((this.bossDamage + this.goldMod * this.modifier), 0)
    this.valor = Phaser.Math.RoundTo((this.bossDamage * 0.1), 0)

    this.dragon = this.scene.add.sprite(x, y, this.getRandomDragonSprite()).setOrigin(0.5, 0.5)
    this.setScaleToFitWindow(0);
    this.scene.scale.on('resize', this.setScaleToFitWindow, this)

    this.originalX = this.dragon.x;
    this.originalY = this.dragon.y;
    this.originalAngle = 0;

    this.dragon.setInteractive()
    this.addInteractions()
    this.setupEventListeners();
  }

  setScaleToFitWindow(modifier) {
    const { width, height } = this.scene.cameras.main
    const dragonWidth = this.dragon.width
    const dragonHeight = this.dragon.height

    const scaleX = width / dragonWidth
    const scaleY = height / dragonHeight

    const scale = Math.min(scaleX, scaleY) * 0.5 + modifier;
    this.dragon.setScale(scale)
  }

  getRandomDragonHP() {
    const minHP = 10; // 100 / 10
    const maxHP = 100; // 1000 / 10
    return Phaser.Math.Between(minHP, maxHP) * (1 + (AppState.activeRoom.difficulty * AppState.activeRoom.difficulty));
  }

  getRandomDragonSprite() {
    const dragonImages = ['dragon_1', 'dragon_3', 'dragon_4', 'dragon_5', 'dragon_6', 'dragon_7', 'dragon_8', 'dragon_9'];
    return Phaser.Math.RND.pick(dragonImages);
  }

  getRandomDragonSound() {
    const dragonSounds = ['swish_2', 'swish_3', 'swish_4'];
    return Phaser.Math.RND.pick(dragonSounds);
  }

  addInteractions() {



    this.dragon.on('pointerdown', () => {
      this.onDragonHit()

    });

    this.dragon.on('pointerover', () => {
      this.onPointerOver()
    });

    this.dragon.on('pointerout', () => {
      this.onPointerOut()
    });
  }

  setupEventListeners() {
    this.scene.events.on('dragon:hit', this.onDragonHit, this);
    this.scene.events.on('dragon:over', this.onPointerOver, this);
    this.scene.events.on('dragon:out', this.onPointerOut, this);
    this.scene.events.on('dragon:attackItem', this.onAttackItem, this);
  }

  checkDeath() {
    if (this.dragonHP <= 0) {

      AppState.bossDamage = this.bossDamage
      AppState.winStreak++

      AppState.gold = Phaser.Math.RoundTo(this.gold + (this.gold * (AppState.winStreak * .025)), 0)
      AppState.valor = Phaser.Math.RoundTo(this.valor + (this.valor * (AppState.winStreak * .025)), 0)


      this.scene.events.off('dragon:hit')
      this.scene.events.off('dragon:over')
      this.scene.events.off('dragon:out')
      this.scene.events.off('dragon:attackItem')
      this.scene.playerHp = this.scene.playerMaxHp

      this.scene.leaveRoom()
    }
  }

  onAttackItem() {
    const selectedSound = 'attackItem'
    const sound = this.scene.sound.add(selectedSound)
    sound.play();
    sound.volume = 1;

    this.dragonHP = Phaser.Math.RoundTo((this.dragonHP / 2), 0);
    this.scene.bossUi.updateBossHp(this.dragonHP)
    // this.scene.clickText.setText(`HP: ${this.dragonHP}`)

    this.checkDeath()

    this.scene.tweens.add({
      // Shake effect
      targets: this.dragon,
      duration: 300, // Duration of the shake in milliseconds
      ease: 'Power1',
      x: this.dragon.x + Phaser.Math.RND.between(-16, 16), // Random X offset
      y: this.dragon.y + Phaser.Math.RND.between(-16, 16), // Random Y offset
      angle: this.dragon.angle + Phaser.Math.RND.between(-16, 16),
      yoyo: true, // Yoyo back to original position
      repeat: 0, // Number of times to repeat (0 means no repeat, just once)
      onStart: () => {
        this.dragon.setTint(0xff0000); // Turn red at the start of the tween
      },
      onComplete: () => {
        // Reset to original values
        this.dragon.x = this.originalX;
        this.dragon.y = this.originalY;
        this.dragon.angle = this.originalAngle;
        this.dragon.clearTint(); // Reset tint to default color
      }
    });
  }
  onDragonHit() {
    const selectedSound = this.getRandomDragonSound()
    const sound = this.scene.sound.add(selectedSound)
    sound.play();
    sound.volume = 0.2;

    this.dragonHP -= AppState.account.power + (AppState.powerMod[AppState.activeRoom.id] || 0)
    this.scene.bossUi.updateBossHp(this.dragonHP)
    // this.scene.clickText.setText(`HP: ${this.dragonHP}`)

    this.checkDeath()

    this.scene.tweens.add({

      // Shake effect
      targets: this.dragon,
      duration: 100, // Duration of the shake in milliseconds
      ease: 'Power1',
      x: this.dragon.x + Phaser.Math.RND.between(-16, 16), // Random X offset
      y: this.dragon.y + Phaser.Math.RND.between(-16, 16), // Random Y offset
      angle: this.dragon.angle + Phaser.Math.RND.between(-16, 16),
      yoyo: true, // Yoyo back to original position
      repeat: 0,
      onComplete: () => {
        this.dragon.x = this.originalX;
        this.dragon.y = this.originalY;
        this.dragon.angle = this.originalAngle;
      }
    });
  }

  onPointerOver() {
    // this.dragon.setTint(0xD62E0B);
    this.setScaleToFitWindow(.2)
    this.dragon.y -= 8;
    this.scene.input.setDefaultCursor('pointer');
  }

  onPointerOut() {
    // this.dragon.clearTint();
    this.setScaleToFitWindow(0)
    this.dragon.y = this.originalY;
    this.scene.input.setDefaultCursor('default');
  }



}