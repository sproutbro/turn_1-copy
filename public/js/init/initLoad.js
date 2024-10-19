export function initLoad() {
  this.load.spritesheet("orc1_walk", "assets/orc1_walk.png", {
    frameWidth: 106,
    frameHeight: 79,
  });

  this.load.spritesheet("orc1_attak", "assets/orc1_attak.png", {
    frameWidth: 106,
    frameHeight: 79,
  });

  this.load.spritesheet("princess_walk", "assets/princess_walk.png", {
    frameWidth: 47.75,
    frameHeight: 62.5,
  });

  this.load.image("tileset", "assets/tileset2.png");
  this.load.image("pngwing", "assets/pngwing.com.png");

  this.load.spritesheet(
    "femaleAdventurer",
    "assets/character_femaleAdventurer_sheet.png",
    {
      frameWidth: 96,
      frameHeight: 128,
    }
  );

  this.load.spritesheet(
    "femalePerson",
    "assets/character_femalePerson_sheet.png",
    {
      frameWidth: 96,
      frameHeight: 128,
    }
  );

  this.load.spritesheet(
    "maleAdventurer",
    "assets/character_maleAdventurer_sheet.png",
    {
      frameWidth: 96,
      frameHeight: 128,
    }
  );

  this.load.spritesheet("malePerson", "assets/character_malePerson_sheet.png", {
    frameWidth: 96,
    frameHeight: 128,
  });

  this.load.tilemapTiledJSON("map", "assets/tilemap2.json");
}
