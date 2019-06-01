import { Injectable } from '@angular/core';
import { Field } from './field';
import { Settings } from './settings';
import { GameAI } from './game-ai';
import { Board } from './board';

@Injectable()
export class GameService {

  player = 1;
  message = null;
  settings = new Settings();
  board = new Board();
  ai = new GameAI(this.player);

  get currentPlayerGlyph(): string {
    return this.player === 1 ? this.settings.player1Glyph : this.settings.player2Glyph;
  }

  // Used for UI binding
  get player1Glyph(): string {
    return this.settings.player1Glyph;
  }

  // Used for UI binding
  set player1Glyph(glyph: string) {
    this.settings.player1Glyph = glyph;
    this.board.update(1, glyph);
  }

  // Used for UI binding
  get player2Glyph(): string {
    return this.settings.player2Glyph;
  }

  // Used for UI binding
  set player2Glyph(glyph: string) {
    this.settings.player2Glyph = glyph;
    this.board.update(2, glyph);
  }

  set playAgainstComputer(value: boolean) {
    if (value) {
      this.settings.setComputerPlayer(this.player);
      this.board.update(this.settings.computerPlayer, this.settings.computerGlyph);
    } else { // restore
      this.settings.restorePlayer();
      this.board.update(this.settings.oldPlayer, this.settings.oldGlyph);
    }
  }

  playTo(field: Field) {
    field.player = this.player;
    field.glyph = this.currentPlayerGlyph;
    field.disable();
  }

  switchPlayers() {
    if (!this.checkForGameOver()) {
      this.switchPlayer();
      if (this.player === this.settings.computerPlayer) {
        this.aiPlay();
      }
    }
  }

  aiPlay() {
    this.playTo(this.ai.getFieldToPlay(this.board, this.player));
    this.switchPlayers();
  }

  canPlay(field: Field): boolean {
    return !field.isDisabled;
  }

  checkForGameOver(): boolean {
    const played = this.board.getMatchingFields(this.player);
    if (played.length === 3) {
      return this.gameOver(played);
    }
    if (!this.board.hasEmptyFields) {
      return this.gameOver(null);
    }

    return false;
  }

  gameOver(played: Field[]): boolean {
    if (played) {
      for (const field of played) {
        field.lock();
      }
    } else {
      this.message = `It's a draw!`;
      return true;
    }

    this.board.disable();
    let player = this.settings.player1Name;
    if (this.player === 2) {
      player = this.settings.player2Name;
    }
    if (!player) {
      player = 'Player ' + this.player;
    }
    this.message = `${player} is the winner!`;
    return true;
  }

  startNewGame() {
    this.message = null;
    this.board.reset();

    if (this.player === this.settings.computerPlayer) {
      this.switchPlayer(); // always allow human to play first
    }
  }

  private switchPlayer() {
    this.player = this.player === 1 ? 2 : 1;
  }
}
