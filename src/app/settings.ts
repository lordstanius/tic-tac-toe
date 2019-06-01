export class Settings {
  player1Name = 'Player1';
  player2Name = 'Player2';
  computerPlayer = 0;
  oldPlayer: number;
  oldGlyph: string;
  oldPlayerName: string;

  public readonly glyphs = ['clear', 'radio_button_unchecked', 'android', 'face', 'mood', 'favorite', 'star'];
  public readonly computerGlyph = 'android';
  public player1Glyph: string;
  public player2Glyph: string;

  private readonly computerPlayerName = 'Computer';

  constructor() {
    this.player1Glyph = this.glyphs[0];
    this.player2Glyph = this.glyphs[1];
  }

  setComputerPlayer(currentPlayer: number) {
    if (currentPlayer === 1) {
      this.computerPlayer = 2;
      this.oldPlayer = 2;
      this.oldGlyph = this.player2Glyph;
      this.oldPlayerName = this.player2Name;
      this.player2Name = this.computerPlayerName;
      this.player2Glyph = this.computerGlyph;
    } else {
      this.computerPlayer = 1;
      this.oldPlayer = 1;
      this.oldGlyph = this.player1Glyph;
      this.oldPlayerName = this.player1Name;
      this.player1Name = this.computerPlayerName;
      this.player1Glyph = this.computerGlyph;
    }
  }

  restorePlayer() {
    if (this.computerPlayer === 1) {
      this.player1Name = this.oldPlayerName;
      this.player1Glyph = this.oldGlyph;
    } else {
      this.player2Name = this.oldPlayerName;
      this.player2Glyph = this.oldGlyph;
    }
    this.computerPlayer = 0;
  }
}
