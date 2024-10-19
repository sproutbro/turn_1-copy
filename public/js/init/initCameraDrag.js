export function initCameraDrag() {
  this.isDragging = false;
  this.dragStartPoint = new Phaser.Math.Vector2();
  this.cameraStartPoint = new Phaser.Math.Vector2();
  const { map } = this;

  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  this.input.on("pointerdown", (pointer) => {
    this.isDragging = true;
    this.dragStartPoint.set(pointer.x, pointer.y);
    this.cameraStartPoint.set(
      this.cameras.main.scrollX,
      this.cameras.main.scrollY
    );
  });

  this.input.on("pointerup", () => {
    this.isDragging = false;
  });

  this.input.on("pointerupoutside", () => {
    this.isDragging = false;
  });

  this.input.on("pointermove", (pointer) => {
    if (this.isDragging) {
      const dragX = pointer.x - this.dragStartPoint.x;
      const dragY = pointer.y - this.dragStartPoint.y;

      this.cameras.main.scrollX = this.cameraStartPoint.x - dragX;
      this.cameras.main.scrollY = this.cameraStartPoint.y - dragY;
    }
  });
}

export function moveCamera(scene, x, y) {
  const { width, height } = scene.game.config;
  scene.cameras.main.scrollX = x - width / 2;
  scene.cameras.main.scrollY = y - height / 2;
}
