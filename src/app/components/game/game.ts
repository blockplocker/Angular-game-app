import { Component, input } from '@angular/core';
import { Game as GameModel } from '../../model/game.type';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-game',
  imports: [RouterLink],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
game = input.required<GameModel>();

}
