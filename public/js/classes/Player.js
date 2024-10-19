import { moveCamera } from "../init/index.js";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    {
      x,
      y,
      texture,
      speed,
      movementRange,
      attackRange,
      coolTime,
      energy,
      playerId,
    }
  ) {
    super(scene, x, y, texture);

    this.scene = scene;
    this.speed = speed;
    this.movementRange = 5;
    this.attackRange = attackRange;
    this.playerId = playerId;
    this.energy = energy;
    this.coolTime = coolTime;
    this.initCoolTime = coolTime;

    this.isMovementRange = false;
    this.isMoved = false;
    this.isAttack = false;

    const { width, height } = scene.map;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setDisplaySize(width, height);
    this.setDepth(2);
    this.setInteractive();
    this.on("pointerdown", () => this.handleClick());

    moveCamera(scene, x, y);

    this.init();
  }

  init() {
    this.scene.energyManager.create(this);
    this.scene.energyManager.createTime(this);

    const textConfig = { color: "#ffffff", backgroundColor: "#000000" };

    this.scene.add.text(0, 0, this.texture.key, textConfig).setScrollFactor(0);

    this.energyText = this.scene.add
      .text(0, 20, `energy : ${this.energy}`, textConfig)
      .setScrollFactor(0);

    this.coolTimeText = this.scene.add
      .text(0, 40, `coolTime : ${this.coolTime}`, textConfig)
      .setScrollFactor(0);

    this.pointButton = this.scene.add
      .text(0, 60, "point", textConfig)
      .setInteractive()
      .setScrollFactor(0);
    this.pointButton.on("pointerdown", () => {
      moveCamera(this.scene, this.x, this.y);
    });

    this.moveButton = this.scene.add
      .text(0, 80, "move", textConfig)
      .setInteractive()
      .setScrollFactor(0);
    this.moveButton.on("pointerdown", () => {
      this.onMovementRange();
    });

    this.attackButton = this.scene.add
      .text(0, 100, "attack", textConfig)
      .setInteractive()
      .setScrollFactor(0);
    this.attackButton.on("pointerdown", () => {
      this.onAttackRange();
    });
  }

  handleClick() {
    if (!this.isMoved) {
      this.onMovementRange();
    }

    if (this.isMoved && !this.isAttack) {
      this.onAttackRange();
    }
  }

  onMovementRange() {
    moveCamera(this.scene, this.x, this.y);
    if (this.isMoved) return;
    this.scene.effect.onDarkOverlay();
    this.scene.effect.onMovementRange();
  }

  onAttackRange() {
    moveCamera(this.scene, this.x, this.y);
    this.scene.effect.onDarkOverlay();
    this.scene.effect.onAttackRange();
  }

  move(x, y) {
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);
    const targetX = tileX * 32 + 32 / 2;
    const targetY = tileY * 32 + 32 / 2;
    this.scene.physics.moveTo(this, targetX, targetY, this.speed);
    this.targetPosition = { x: targetX, y: targetY };
    // this.isMoved = true;
    this.moveButton.setVisible(false);
  }

  attack(x, y) {
    const tileX = Math.floor(x / 32);
    const tileY = Math.floor(y / 32);
    const targetX = tileX * 32 + 32 / 2;
    const targetY = tileY * 32 + 32 / 2;

    console.log(targetX, targetY);
    console.log("어택했다");

    // this.isAttack = true;
    this.attackButton.setVisible(false);
  }

  update() {
    if (this.coolTime) {
      this.coolTimeBar.width = (this.coolTime / this.initCoolTime) * 50;
      this.coolTimeText.setText(`coolTime : ${this.coolTime}`);
      this.scene.socket.emit("COOLTIME_PLAYER", this.coolTime--);
    } else {
      this.coolTime = this.initCoolTime;
      this.isMoved = false;
      this.isAttack = false;
      this.attackButton.setVisible(true);
      this.moveButton.setVisible(true);
    }

    if (this.targetPosition) {
      this.scene.socket.emit("MOVE_PLAYER", { x: this.x, y: this.y });

      this.energyBar.setPosition(this.x, this.y - 20);
      this.energyBackground.setPosition(this.x, this.y - 20);
      this.coolTimeBar.setPosition(this.x, this.y - 25);
      this.coolTimeBackground.setPosition(this.x, this.y - 25);

      const distance = Phaser.Math.Distance.Between(
        this.x,
        this.y,
        this.targetPosition.x,
        this.targetPosition.y
      );

      if (distance < 4) {
        this.body.setVelocity(0, 0);
        this.targetPosition = null;
      }
    }
  }
}
