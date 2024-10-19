export default class EnergyManager {
  constructor(scene) {
    this.scene = scene;
  }

  create(player) {
    const { x, y, energy } = player;
    player.energyBackground = this.scene.add.rectangle(
      x,
      y - 20,
      (energy / 100) * 50,
      10,
      0x000000
    );
    player.energyBar = this.scene.add.rectangle(
      x,
      y - 20,
      (energy / 100) * 50,
      10,
      0x00ff00
    );
  }

  createTime(player) {
    const { x, y, coolTime } = player;
    player.coolTimeBackground = this.scene.add.rectangle(
      x,
      y - 25,
      (coolTime / 1000) * 50,
      5,
      0x000000
    );
    player.coolTimeBar = this.scene.add.rectangle(
      x,
      y - 25,
      (coolTime / 1000) * 50,
      5,
      0x00ffff
    );
  }
}
