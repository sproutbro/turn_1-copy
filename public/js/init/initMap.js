export function initMap() {
  this.map = this.make.tilemap({ key: "map" });
  this.tileset = this.map.addTilesetImage("tileset", "tileset");
  this.backgroundLayer = this.map.createLayer(
    "backgroundLayer",
    this.tileset,
    0,
    0
  );

  const { widthInPixels, heightInPixels } = this.map;
  this.physics.world.setBounds(0, 0, widthInPixels, heightInPixels);
}
