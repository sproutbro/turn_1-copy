import Group from "../classes/Group.js";
import Player from "../classes/Player.js";
import Unit from "../classes/Unit.js";
import Effect from "../classes/Effect.js";
import { initLoad, initAnim, initMap, initCameraDrag } from "../init/index.js";
import EnergyManager from "../classes/EnergyManager.js";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });

    this.group = new Group();
    this.effect = new Effect(this);
    this.energyManager = new EnergyManager(this);
  }

  preload() {
    initLoad.call(this);
  }

  create() {
    initAnim.call(this);
    initMap.call(this);
    initCameraDrag.call(this);

    // this.effect.createGrid();

    this.socket = io();
    this.socket.on("CURRENT_PLAYERS", (players) => {
      Object.keys(players).forEach((key) => {
        if (key === this.socket.id) {
          this.player = new Player(this, players[key]);
        } else {
          this.group.addUnit(new Unit(this, players[key]));
        }
      });
    });

    this.socket.on("NEW_PLAYER", (player) => {
      this.group.addUnit(new Unit(this, player));
    });

    this.socket.on("MOVE_PLAYER", (player) => {
      const { playerId, x, y } = player;
      this.group.units[playerId].move(x, y);
    });

    this.socket.on("COOLTIME_PLAYER", (player) => {
      const { playerId, coolTime } = player;
      this.group.units[playerId].setCoolTime(coolTime);
    });

    this.socket.on("PLAYER_DISCONNECT", (playerId) => {
      this.group.remove(playerId);
    });
  }

  update() {
    this.player?.update();

    this.group?.update();
  }
}
