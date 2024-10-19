export default class Effect {
  constructor(scene) {
    this.scene = scene;
    this.movementRange = [];
    this.attackRange = [];

    this.isMovementRange = false;
    this.isDarkOverlay = false;
  }

  onDarkOverlay() {
    if (this.isDarkOverlay) return;

    const graphics = this.scene.add.graphics();
    const { heightInPixels, widthInPixels } = this.scene.map;

    graphics.clear();
    this.isDarkOverlay = this.scene.add.rectangle(
      widthInPixels / 2, // 중앙에 위치하도록 설정
      heightInPixels / 2,
      widthInPixels,
      heightInPixels,
      0x000000, // 검정색
      0.5 // 투명도
    );

    this.isDarkOverlay.setInteractive();
    this.isDarkOverlay.on("pointerdown", () => this.offDarkOverlay());
  }

  offDarkOverlay() {
    this.isDarkOverlay.destroy();
    this.isDarkOverlay = false;
    this.offMovementRange();
    this.offAttackRange();
  }

  onMovementRange() {
    if (this.isMovementRange) return;
    const player = this.scene.player;
    const range = player.movementRange;

    for (let dx = -range; dx <= range; dx++) {
      for (let dy = -range; dy <= range; dy++) {
        const x = player.x + dx * 32;
        const y = player.y + dy * 32;
        if (Math.abs(dx) + Math.abs(dy) <= range) {
          const square = this.scene.add.rectangle(x, y, 32, 32, 0x00ff00, 0.5); // 반투명한 사각형 생성
          square.setInteractive(); // 인터랙티브 설정
          square.setDepth(1);
          square.on("pointerdown", (pointer) => {
            this.handleMove(pointer);
          });

          this.movementRange.push(square);
        }
      }
    }

    this.isMovementRange = true;
  }

  offMovementRange() {
    if (!this.isMovementRange) return;

    this.movementRange.forEach((square) => {
      square.destroy(); // 생성한 사각형 모두 삭제
    });

    this.isMovementRange = false;
  }

  handleMove(pointer) {
    if (this.isOccupied(pointer)) {
      console.log("유닛존재");
    } else {
      this.scene.player.move(pointer.worldX, pointer.worldY);
    }
    this.offDarkOverlay();
  }

  onAttackRange() {
    if (this.isAttackRange) return;
    const player = this.scene.player;
    const range = player.attackRange;

    for (let dx = -range; dx <= range; dx++) {
      for (let dy = -range; dy <= range; dy++) {
        const x = player.x + dx * 32;
        const y = player.y + dy * 32;
        if (Math.abs(dx) + Math.abs(dy) <= range) {
          const square = this.scene.add.rectangle(x, y, 32, 32, 0x00ffff, 0.5); // 반투명한 사각형 생성
          square.setInteractive(); // 인터랙티브 설정
          square.setDepth(1);
          square.on("pointerdown", (pointer) => {
            this.handleAttack(pointer);
          });

          this.attackRange.push(square);
        }
      }
    }

    this.isAttackRange = true;
  }

  handleAttack(pointer) {
    if (this.isOccupied(pointer)) {
      this.scene.player.attack(pointer.worldX, pointer.worldY);
    } else {
      console.log("대상없음");
    }
    this.offDarkOverlay();
  }

  offAttackRange() {
    if (!this.isAttackRange) return;

    this.attackRange.forEach((square) => {
      square.destroy(); // 생성한 사각형 모두 삭제
    });

    this.isAttackRange = false;
  }

  isOccupied(pointer) {
    const units = this.scene.group.units;

    let isNotNull = false;

    Object.keys(units).forEach((key) => {
      const unit = units[key];
      const tileX = Math.floor(pointer.worldX / 32);
      const tileY = Math.floor(pointer.worldY / 32);
      const unitX = Math.floor(unit.x / 32);
      const unitY = Math.floor(unit.y / 32);

      if (unitX === tileX && unitY === tileY) {
        isNotNull = true; // 다른 유닛이 해당 위치에 있는 경우
      }
    });

    return isNotNull; // 빈 타일인 경우
  }

  createGrid() {
    const TILE_SIZE = 32; // 타일 크기
    const MAP_WIDTH = 32; // 맵의 가로 타일 수
    const MAP_HEIGHT = 32; // 맵의 세로 타일 수

    const graphics = this.scene.add.graphics();

    // 선 스타일 설정 (두께, 색상)
    graphics.lineStyle(1, 0xffffff, 1);

    // 가로 줄 그리기
    for (let i = 0; i <= MAP_HEIGHT; i++) {
      graphics.moveTo(0, i * TILE_SIZE);
      graphics.lineTo(MAP_WIDTH * TILE_SIZE, i * TILE_SIZE);
    }

    // 세로 줄 그리기
    for (let j = 0; j <= MAP_WIDTH; j++) {
      graphics.moveTo(j * TILE_SIZE, 0);
      graphics.lineTo(j * TILE_SIZE, MAP_HEIGHT * TILE_SIZE);
    }

    // 줄 그리기
    graphics.strokePath();
  }
}
