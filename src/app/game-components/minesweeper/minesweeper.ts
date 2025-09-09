import { Component } from '@angular/core';

@Component({
  selector: 'app-minesweeper',
  imports: [],
  templateUrl: './minesweeper.html',
  styleUrl: './minesweeper.scss',
})
export class Minesweeper {
  Board: string[][] = [];
  rows: number = 10;
  columns: number = 10;
  minesCount: number = 10;
  revealed: boolean[][] = [];
  gameOver: boolean = false;
  gameWon: boolean = false;
  flagsLeft: number = this.minesCount;

  constructor() {
    this.setDifficulty('easy');
  }
  startNewGame() {
    this.gameOver = false;
    this.gameWon = false;
    this.flagsLeft = this.minesCount;
    this.Board = Array.from({ length: this.rows }, () => Array(this.columns).fill(''));
    this.revealed = Array.from({ length: this.rows }, () => Array(this.columns).fill(false));
    this.placeMines();
    this.calculateAdjacentMines();
  }
  setDifficulty(difficulty: string) {
    switch (difficulty) {
      case 'easy':
        this.rows = 8;
        this.columns = 8;
        this.minesCount = 10;
        break;
      case 'medium':
        this.rows = 12;
        this.columns = 12;
        this.minesCount = 25;
        break;
      case 'hard':
        this.rows = 16;
        this.columns = 16;
        this.minesCount = 40;
        break;
    }
    this.startNewGame();
  }
  placeMines() {
    let placedMines = 0;
    while (placedMines < this.minesCount) {
      const row = Math.floor(Math.random() * this.rows);
      const col = Math.floor(Math.random() * this.columns);
      if (this.Board[row][col] === '') {
        this.Board[row][col] = 'M';
        placedMines++;
      }
    }
  }
  calculateAdjacentMines() {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (this.Board[row][col] === 'M') continue;
        let mineCount = 0;
        for (const [dx, dy] of directions) {
          const newRow = row + dx;
          const newCol = col + dy;
          if (this.isInBounds(newRow, newCol) && this.Board[newRow][newCol] === 'M') {
            mineCount++;
          }
        }
        this.Board[row][col] = mineCount.toString();
      }
    }
  }
  isInBounds(row: number, col: number): boolean {
    return row >= 0 && row < this.rows && col >= 0 && col < this.columns;
  }
  revealCell(row: number, col: number) {
    if (this.gameOver || this.gameWon || this.revealed[row][col]) return;
    this.revealed[row][col] = true;
    if (this.Board[row][col] === 'M') {
      this.gameOver = true;
    } else if (this.Board[row][col] === '0') {
      this.revealAdjacentCells(row, col);
    }
    this.checkWinCondition();
  }
  revealAdjacentCells(row: number, col: number) {
    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    for (const [dx, dy] of directions) {
      const newRow = row + dx;
      const newCol = col + dy;
      if (this.isInBounds(newRow, newCol) && !this.revealed[newRow][newCol]) {
        this.revealCell(newRow, newCol);
      }
    }
  }
  checkWinCondition() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        if (this.Board[row][col] !== 'M' && !this.revealed[row][col]) {
          return;
        }
      }
    }
    this.gameWon = true;
  }
}
