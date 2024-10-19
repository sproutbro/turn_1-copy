export function initAnim() {
  createAnimation(this.anims, "princess_idle", "princess_walk", 10, 0, 3);
  createAnimation(this.anims, "princess_walk", "princess_walk", 10, 4, 7);

  createAnimation(this.anims, "orc1_walk", "orc1_walk", 10, 0, 6);
  createAnimation(this.anims, "orc1_attak", "orc1_attak", 10, 0, 6);

  createAnimation(this.anims, "malePerson_walk", "malePerson", 10, 36, 43);
  createAnimation(this.anims, "malePerson_attack", "malePerson", 10, 27, 29);

  createAnimation(
    this.anims,
    "maleAdventurer_walk",
    "maleAdventurer",
    10,
    36,
    43
  );
  createAnimation(
    this.anims,
    "maleAdventurer_attack",
    "maleAdventurer",
    10,
    27,
    29
  );
}

function createAnimation(
  anims,
  key,
  spriteSheetKey,
  frameRate,
  startFrame,
  endFrame,
  repeat = -1
) {
  anims.create({
    key: key,
    frames: anims.generateFrameNumbers(spriteSheetKey, {
      start: startFrame,
      end: endFrame,
    }),
    frameRate: frameRate,
    repeat: repeat,
  });
}
