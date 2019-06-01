import { Field } from './field';

export class Board {
  public readonly fields: Field[] = [];
  private currentFieldIndex = 0;

  constructor() {
    for (let row = 0; row < 3; ++row) {
      for (let col = 0; col < 3; ++col) {
        this.fields.push(new Field(row, col));
      }
    }
  }

  get nextField(): Field {
    return this.fields[this.currentFieldIndex++];
  }

  get hasEmptyFields(): boolean {
    for (const field of this.fields) {
      if (!field.isDisabled) {
        return true;
      }
    }

    return false;
  }

  getEmptyFields(): Field[] {
    return this.fields.filter(field => !field.isDisabled);
  }

  getMatchingFields(player: number) {
    let played: Field[];
    for (let i = 0; i < 3; ++i) {
      played = this.checkCol(i, player);
      if (played.length === 3) {
        return played;
      }
    }

    for (let i = 0; i < 3; ++i) {
      played = this.checkRow(i, player);
      if (played.length === 3) {
        return played;
      }
    }

    played = this.checkDiagonal(true, player);
    if (played.length === 3) {
      return played;
    }

    played = this.checkDiagonal(false, player);
    if (played.length === 3) {
      return played;
    }

    return played;
  }

  checkCol(col: number, player: number): Field[] {
    const played: Field[] = [];
    for (const field of this.fields) {
      if (field.col === col && field.player === player) {
        played.push(field);
      }
    }
    return played;
  }

  checkRow(row: number, player: number): Field[] {
    const played: Field[] = [];
    for (const field of this.fields) {
      if (field.row === row && field.player === player) {
        played.push(field);
      }
    }
    return played;
  }

  winning(player) {
    return (this.fields[0].player === player && this.fields[1].player === player && this.fields[2].player === player) ||
           (this.fields[3].player === player && this.fields[4].player === player && this.fields[5].player === player) ||
           (this.fields[6].player === player && this.fields[7].player === player && this.fields[8].player === player) ||
           (this.fields[0].player === player && this.fields[3].player === player && this.fields[6].player === player) ||
           (this.fields[1].player === player && this.fields[4].player === player && this.fields[7].player === player) ||
           (this.fields[2].player === player && this.fields[5].player === player && this.fields[8].player === player) ||
           (this.fields[0].player === player && this.fields[4].player === player && this.fields[8].player === player) ||
           (this.fields[2].player === player && this.fields[4].player === player && this.fields[6].player === player);
  }

  checkDiagonal(isMain: boolean, player: number): Field[] {
    const played: Field[] = [];
    for (const field of this.fields) {
      if (isMain && field.row === field.col && field.player === player ||
        !isMain && field.row + field.col === 2 && field.player === player) {
        played.push(field);
      }
    }
    return played;
  }

  update(player: number, glyph: string) {
    for (const field of this.fields) {
      if (field.player === player) {
        field.glyph = glyph;
      }
    }
  }

  disable() {
    // disable all fields
    for (const field of this.fields) {
      field.disable();
    }
  }

  reset() {
    for (const field of this.fields) {
      field.reset();
    }
  }
}
