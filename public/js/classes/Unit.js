export default class Unit extends Phaser.Physics.Arcade.Sprite {
  constructor(
    scene,
    { x, y, texture, speed, energy, coolTime, movementRange, playerId }
  ) {
    super(scene, x, y, texture);

    this.speed = speed;
    this.movementRange = movementRange;
    this.energy = energy;
    this.coolTime = coolTime;
    this.initCoolTime = coolTime;
    this.playerId = playerId;

    const { width, height } = scene.map;

    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setDisplaySize(width, height);
    this.setDepth(0);
    this.setInteractive();
    this.on("pointerdown", () => this.showUnitInfo());

    this.createUnitInfo();

    this.init();
  }

  init() {
    this.scene.energyManager.create(this);
    this.scene.energyManager.createTime(this);
  }

  createUnitInfo() {
    const textConfig = {
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#000000",
      padding: { x: 10, y: 5 },
      wordWrap: { width: 200 },
    };

    this.infoText = this.scene.add
      .text(150, 0, "", textConfig)
      .setVisible(false)
      .setScrollFactor(0);

    this.scene.input.on("pointerdown", (pointer, currentlyOver) => {
      if (!currentlyOver.length) {
        this.hideUnitInfo();
      }
    });
  }

  showUnitInfo() {
    const description = "fdjiosfjidsofjisofjiodfjisdofjio";
    this.infoText.setPosition(200, 0).setText(description).setVisible(true);
  }

  hideUnitInfo() {
    this.infoText.setVisible(false);
  }

  move(x, y) {
    this.x = x;
    this.y = y;
    this.energyBar.setPosition(x, y - 20);
    this.energyBackground.setPosition(x, y - 20);
    this.coolTimeBar.setPosition(x, y - 25);
    this.coolTimeBackground.setPosition(x, y - 25);
  }

  setCoolTime(coolTime) {
    this.coolTimeBar.width = (coolTime / this.initCoolTime) * 50;
  }
}
