/**
 * This solution is based on minimax algorithm.
 * See https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37 for details.
 */

import { Field } from './field';
import { Board } from './board';

class Move {
  constructor(public score: number = 0, public index: number = 0) { }
}

export class GameAI {
  private huPlayer = 0;

  constructor(private aiPlayer: number) {
    if (aiPlayer === 1) {
      this.huPlayer = 2;
    } else if (aiPlayer === 2) {
      this.huPlayer = 1;
    }
  }

  getFieldToPlay(board: Board, player: number): Field {
    const bestMove = this.findBestMove(board, player);
    return board.fields[bestMove.index];
  }

  private findBestMove(board: Board, player: number): Move {
    const availSpots = board.getEmptyFields();
    if (board.winning(this.huPlayer)) {
      return new Move(-10);
    } else if (board.winning(this.aiPlayer)) {
      return new Move(10);
    } else if (availSpots.length === 0) {
      return new Move();
    }

    const moves: Move[] = [];

    // loop through available spots
    for (let i = 0; i < availSpots.length; i++) {
      // create an object for each and store the index of that spot
      const index = availSpots[i].index;
      const move = new Move(0, index);

      // set the empty spot to the current player
      board.fields[index].player = player;
      board.fields[index].disable();

      /*collect the score resulted from calling minimax
        on the opponent of the current player*/
      if (player === this.aiPlayer) {
        const result = this.findBestMove(board, this.huPlayer);
        move.score = result.score;
      } else {
        const result = this.findBestMove(board, this.aiPlayer);
        move.score = result.score;
      }

      // reset the spot to empty
      board.fields[index].reset();

      // push the object to the array
      moves.push(move);
    }

    // if it is the computer's turn loop over the moves and choose the move with the highest score
    let bestMove, bestScore;

    if (player === this.aiPlayer) {
      bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      // loop over the moves and choose the move with the lowest score
      bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // return the chosen move (object) from the moves array
    return moves[bestMove];
  }
}
