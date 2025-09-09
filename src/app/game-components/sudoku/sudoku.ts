import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SudokuService } from '../../services/sudoku-service';

@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.html',
  styleUrl: './sudoku.scss',
  imports: [CommonModule, FormsModule],
})
export class Sudoku {
  difficulty: string = 'easy';
  puzzle: (number | null)[][] = [];
  solution: number[][] = [];
  wrongMoves: number = 0;
  sudokuService: SudokuService = inject(SudokuService);

  ngOnInit() {
    this.generateSudoku();
  }

  generateSudoku() {
    this.wrongMoves = 0;
    this.sudokuService.getSudokuFromApi(this.difficulty).subscribe((data) => {
      // If API returns JSON strings, parse them
      if (typeof data.puzzle === 'string') {
        this.puzzle = JSON.parse(data.puzzle);
      } else {
        this.puzzle = data.puzzle;
      }
      if (typeof data.solution === 'string') {
        this.solution = JSON.parse(data.solution);
      } else {
        this.solution = data.solution;
      }
    });
  }

  onCellInput(row: number, col: number, value: string) {
    const num = Number(value);
    if (!value || isNaN(num) || num < 1 || num > 9) return;
    if (this.solution[row][col] !== num) {
      this.wrongMoves++;
      // Optionally, clear the input or show feedback
      this.puzzle[row][col] = null;
    } else {
      this.puzzle[row][col] = num;
    }
  }
}
