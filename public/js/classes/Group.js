export default class Group {
  constructor() {
    this.units = {};
  }

  addUnit(unit) {
    this.units[unit.playerId] = unit;
  }

  remove(playerId) {
    this.units[playerId].destroy();
    delete this.units[playerId];
  }

  update() {
    Object.keys(this.units).forEach((key) => {
      this.units[key].update();
    });
  }
}
