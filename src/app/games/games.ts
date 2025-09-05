import { Component, signal } from '@angular/core';
import { Game } from '../components/game/game';

@Component({
  selector: 'app-games',
  imports: [Game],
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
    },
    {
      id: 2,
      title: 'Minesweeper',
      image: 'https://raw.githubusercontent.com/Pierre-Monier/minesweeper/master/docs/demo.gif',
      link: '/minesweeper'
    },
    {
      id: 3,
      title: 'Sudoku',
      image: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzJvYmlkZXp4ZTMxOGlnNHozZnRocm8xd2llbGFhdjllN2RyYjRtaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41Yy6jvn3BXYDRu0/giphy.gif',
      link: '/sudoku'
    },
    {
      id: 4,
      title: 'Snake',
      image: 'https://www.coolmathgames.com/sites/default/files/2023-01/History%20of%20Snake%20Game%20Gameplay.gif',
      link: '/snake'
    }
  ]);

}
