import { Component } from '@angular/core';
import { HighlightWinnerTicTacToe } from '../../directives/highlight-winner-tic-tac-toe';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [HighlightWinnerTicTacToe],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.scss'
})
export class TicTacToe {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  winner: string | null = null;
  winningCombination: number[] | null = null;

  makeMove(index: number) {
    if (!this.board[index] && !this.winner) {
      this.board[index] = this.currentPlayer;
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';

      this.winner = this.checkWinner();
    }
  }

  resetGame() {
    this.board.fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.winningCombination = null;
  }

  checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
        this.winningCombination = combination;
        return this.board[a];
      }
    }

    return null;
  }
}
