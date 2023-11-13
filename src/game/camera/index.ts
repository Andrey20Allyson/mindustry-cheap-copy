import Phaser from "phaser";

type MyKeyCursor = {
  [K in keyof Phaser.Types.Input.Keyboard.CursorKeys]: number;
}

function createWASDCursorKeys(keyboard: Phaser.Input.Keyboard.KeyboardPlugin) {
  const { W, S, A, D, SHIFT, SPACE } = Phaser.Input.Keyboard.KeyCodes;

  return keyboard.addKeys({
    up: W,
    left: A,
    down: S,
    right: D,
    space: SPACE,
    shift: SHIFT,
  } satisfies MyKeyCursor) as Phaser.Types.Input.Keyboard.CursorKeys;
}

export class PlayerCameraHandler {
  readonly cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys;

  private deltaZoom = 0;
  private minZoom = 1.5;
  private maxZomm = 2.5;

  constructor(
    readonly scene: Phaser.Scene,
  ) {
    const keyboard = this.scene.input.keyboard;
    if (!keyboard) throw new Error(`Keyboard has't initialized!`);

    this.cursorKeys = createWASDCursorKeys(keyboard);
    this.scene.input.on('wheel', this.handleWheel, this);
  }

  get camera() {
    return this.scene.cameras.main;
  }

  update() {
    this.updatePosition();
    this.updateZoom();

    this.resetDeltaZoom();
  }

  handleWheel(_pointer: Phaser.Input.Pointer, _arr: Array<unknown>, _deltaX: number, deltaY: number, _deltaZ: number) {
    this.deltaZoom += -deltaY / 90;
  }

  resetDeltaZoom() {
    this.deltaZoom = 0;
  }

  updateZoom() {
    const newZoom = ((this.deltaZoom / this.camera.zoom) + this.camera.zoom);

    if (newZoom < this.minZoom) {
      this.camera.zoom = this.minZoom;
    } else if (newZoom > this.maxZomm) {
      this.camera.zoom = this.maxZomm;
    } else {
      this.camera.zoom = newZoom;
    }
  }

  updatePosition() {
    const { scrollX, scrollY } = this.camera;
    const x = (+this.cursorKeys.right.isDown + -this.cursorKeys.left.isDown) * 10;
    const y = (-this.cursorKeys.up.isDown + +this.cursorKeys.down.isDown) * 10;

    this.camera.setScroll(
      scrollX + x,
      scrollY + y
    );
  }
}