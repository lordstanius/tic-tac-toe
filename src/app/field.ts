export class Field {
  index: number;
  glyph: string;
  player = 0;
  private disabled = false;
  private locked = false;

  constructor(public row: number, public col: number) {
    this.index = row * 3 + col;
  }

  get isDisabled() {
    return this.disabled;
  }

  get isLocked() {
    return this.locked;
  }

  get isPlayerX(): boolean {
    return this.player === 1;
  }

  get isPlayerO(): boolean {
    return this.player === 2;
  }

  disable() {
    this.disabled = true;
  }

  lock() {
    this.locked = true;
  }

  reset() {
    this.player = 0;
    this.disabled = false;
    this.locked = false;
    this.glyph = null;
  }
}
