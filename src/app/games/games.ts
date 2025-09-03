import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Game } from '../components/game/game';

@Component({
  selector: 'app-games',
  imports: [RouterLink, Game],
  templateUrl: './games.html',
  styleUrl: './games.scss'
})
export class Games {
  games = signal([
    {
      id: 0,
      title: 'Tic Tac Toe',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Tic-tac-toe-animated.gif',
      link: '/tic-tac-toe'
    },
    {
      id: 1,
      title: 'Connect Four',
      image: 'https://mathworld.wolfram.com/images/gifs/connect4.gif',
      link: '/connect-four'
    }
  ]);

}
