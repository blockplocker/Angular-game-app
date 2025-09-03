import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-connect-four',
  imports: [],
  templateUrl: './connect-four.html',
  styleUrl: './connect-four.scss'
})
export class ConnectFour {
  board: string[][] = [];
  currentPlayer: string = 'yellow';
  winner: string | null = null;
  @ViewChild('boardRef') boardElement!: ElementRef;

  constructor() {
    this.initializeBoard();
  }

  initializeBoard() {
    this.board = Array.from({ length: 6 }, () => Array(7).fill(null));
  }
  resetGame() {
    this.initializeBoard();
    this.winner = null;
    this.currentPlayer = 'yellow';
    this.changeClass();
  }
  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 'yellow' ? 'blue' : 'yellow';
    this.changeClass();
  }
  changeClass() {
    const el = this.boardElement.nativeElement;
    
    el.classList.remove('player-yellow', 'player-blue');
    el.classList.add(`player-${this.currentPlayer}`);
  }
  placePiece(column: number) {
    if (this.winner) return;
    const row = this.getAvailableRow(column);
    if (row !== null) {
      this.board[row][column] = this.currentPlayer;
      this.checkForWin(row, column);
      this.switchPlayer();
    }
  }
  isInBounds(row: number, column: number): boolean {
    return row >= 0 && row < 6 && column >= 0 && column < 7;
  }
  declareWinner() {
    this.winner = this.currentPlayer;
  }
  getAvailableRow(column: number): number | null {
    for (let row = 5; row >= 0; row--) {
      if (this.board[row][column] === null) {
        return row;
      }
    }
    return null;
  }
  checkForWin(row: number, column: number) {
    const directions = [
      { x: 1, y: 0 },  // Horizontal
      { x: 0, y: 1 },  // Vertical
      { x: 1, y: 1 },  // Diagonal \
      { x: 1, y: -1 }  // Diagonal /
    ];

    for (const { x, y } of directions) {
      let count = 1;

      // Check in the positive direction
      for (let i = 1; i < 4; i++) {
        const newRow = row + i * y;
        const newCol = column + i * x;
        if (this.isInBounds(newRow, newCol) && this.board[newRow][newCol] === this.currentPlayer) {
          count++;
        } else {
          break;
        }
      }

      // Check in the negative direction
      for (let i = 1; i < 4; i++) {
        const newRow = row - i * y;
        const newCol = column - i * x;
        if (this.isInBounds(newRow, newCol) && this.board[newRow][newCol] === this.currentPlayer) {
          count++;
        } else {
          break;
        }
      }

      if (count >= 4) {
        this.declareWinner();
        return;
      }
    }
  }


}
