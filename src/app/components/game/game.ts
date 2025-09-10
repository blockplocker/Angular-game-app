import { Component, input, output, signal } from '@angular/core';
import { Game as GameModel } from '../../models/game.type';
@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.scss',
})
export class Game {
  game = input.required<GameModel>();
  selectedGame = signal<number | null>(null);
  selectedGameChange = output<number | null>();

  selectGame(gameId: number) {
    this.selectedGame.set(gameId);
    this.selectedGameChange.emit(gameId);
  }
}
