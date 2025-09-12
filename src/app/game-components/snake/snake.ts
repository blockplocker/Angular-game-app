import { Component, OnInit, HostListener } from '@angular/core';
import { LeaderboardEntry } from '../../interfaces/ileaderboard-entry';
import { Direction } from '../../models/direction';
import { FormsModule } from '@angular/forms';

interface Point {
  x: number;
  y: number;
}

@Component({
  selector: 'app-snake',
  templateUrl: './snake.html',
  styleUrls: ['./snake.scss'],
  imports: [FormsModule],
  standalone: true,
})
export class Snake implements OnInit {
  readonly boardSize = 20;
  readonly cellSize = 20;
  readonly initialSnakeLength = 3;
  readonly gameSpeed = 120; // ms

  snake: Point[] = [];
  direction: Direction = Direction.Right;
  nextDirection: Direction = Direction.Right;
  food: Point = { x: 0, y: 0 };
  score = 0;
  gameOver = false;
  intervalId: any;

  leaderboard: LeaderboardEntry[] = [];
  showNameInput = false;
  playerName = '';

  ngOnInit(): void {
    this.loadLeaderboard();
    this.resetGame();
  }

  resetGame(): void {
    this.snake = [];
    for (let i = this.initialSnakeLength - 1; i >= 0; i--) {
      this.snake.push({ x: i, y: 0 });
    }
    this.direction = Direction.Right;
    this.nextDirection = Direction.Right;
    this.score = 0;
    this.gameOver = false;
    this.showNameInput = false;
    this.playerName = '';
    this.placeFood();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => this.gameLoop(), this.gameSpeed);
  }

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent): void {
    if (this.showNameInput) return;
    switch (event.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (this.direction !== Direction.Down) this.nextDirection = Direction.Up;
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        if (this.direction !== Direction.Up) this.nextDirection = Direction.Down;
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (this.direction !== Direction.Right) this.nextDirection = Direction.Left;
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (this.direction !== Direction.Left) this.nextDirection = Direction.Right;
        break;
      case 'r':
      case 'R':
        if (this.gameOver) this.resetGame();
        break;
    }
  }

  gameLoop(): void {
    if (this.gameOver) return;
    this.direction = this.nextDirection;
    const head = { ...this.snake[0] };
    switch (this.direction) {
      case Direction.Up:
        head.y--;
        break;
      case Direction.Down:
        head.y++;
        break;
      case Direction.Left:
        head.x--;
        break;
      case Direction.Right:
        head.x++;
        break;
    }
    if (this.isCollision(head)) {
      this.gameOver = true;
      clearInterval(this.intervalId);
      this.checkLeaderboard();
      return;
    }
    this.snake.unshift(head);
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score++;
      this.placeFood();
    } else {
      this.snake.pop();
    }
  }

  isCollision(point: Point): boolean {
    // Wall collision
    if (point.x < 0 || point.x >= this.boardSize || point.y < 0 || point.y >= this.boardSize) {
      return true;
    }
    // Self collision
    return this.snake.some((seg) => seg.x === point.x && seg.y === point.y);
  }

  placeFood(): void {
    let newFood: Point;
    do {
      newFood = {
        x: Math.floor(Math.random() * this.boardSize),
        y: Math.floor(Math.random() * this.boardSize),
      };
    } while (this.snake.some((seg) => seg.x === newFood.x && seg.y === newFood.y));
    this.food = newFood;
  }

  getBoard(): string[][] {
    const board: string[][] = Array.from({ length: this.boardSize }, () =>
      Array(this.boardSize).fill('')
    );
    for (const [i, seg] of this.snake.entries()) {
      board[seg.y][seg.x] = i === 0 ? 'head' : 'body';
    }
    board[this.food.y][this.food.x] = 'food';
    return board;
  }

  onRestart(): void {
    this.resetGame();
  }

  checkLeaderboard(): void {
    // If score is top 5, show name input
    const lowestScore =
      this.leaderboard.length < 5 ? 0 : this.leaderboard[this.leaderboard.length - 1].score;
    if (this.score > 0 && (this.leaderboard.length < 5 || this.score > lowestScore)) {
      this.showNameInput = true;
    }
  }

  submitName(): void {
    const name = this.playerName.trim() || 'Anonymous';
    this.leaderboard.push({ name, score: this.score });
    this.leaderboard = this.leaderboard.sort((a, b) => b.score - a.score).slice(0, 5);
    this.saveLeaderboard();
    this.showNameInput = false;
    this.playerName = '';
  }

  loadLeaderboard(): void {
    const data = localStorage.getItem('snake-leaderboard');
    if (data) {
      try {
        this.leaderboard = JSON.parse(data);
      } catch {
        this.leaderboard = [];
      }
    }
  }

  saveLeaderboard(): void {
    localStorage.setItem('snake-leaderboard', JSON.stringify(this.leaderboard));
  }
}
