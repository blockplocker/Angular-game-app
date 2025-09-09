import { Component, signal } from '@angular/core';
import { Game } from '../components/game/game';
import { TicTacToe } from '../game-components/tic-tac-toe/tic-tac-toe';
import { Snake } from '../game-components/snake/snake';
import { Minesweeper } from '../game-components/minesweeper/minesweeper';
import { Sudoku } from '../game-components/sudoku/sudoku';
import { ConnectFour } from '../game-components/connect-four/connect-four';

@Component({
  selector: 'app-games',
  imports: [Game, TicTacToe, Snake, Minesweeper, Sudoku, ConnectFour],
  templateUrl: './games.html',
  styleUrl: './games.scss',
})
export class Games {
  selectedGame = signal<number | null>(null);

  games = signal([
    {
      id: 0,
      title: 'Tic Tac Toe',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Tic-tac-toe-animated.gif',
      link: '/games/tic-tac-toe',
      component: 'app-tic-tac-toe',
    },
    {
      id: 1,
      title: 'Snake',
      image:
        'https://camo.githubusercontent.com/bda9dc23e05abc414c18458ed7a24981ca5e80fb792beef42c0cfe68321777d5/68747470733a2f2f69302e77702e636f6d2f6172742e706978696c6172742e636f6d2f6662373434353865663730336166612e6769663f726573697a653d3330302532433330302673736c3d31',
      link: '/games/snake',
      component: 'app-snake',
    },
    {
      id: 2,
      title: 'Minesweeper',
      image: 'https://raw.githubusercontent.com/Pierre-Monier/minesweeper/master/docs/demo.gif',
      link: '/games/minesweeper',
      component: 'app-minesweeper',
    },
    {
      id: 3,
      title: 'Sudoku',
      image:
        'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExYzJvYmlkZXp4ZTMxOGlnNHozZnRocm8xd2llbGFhdjllN2RyYjRtaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l41Yy6jvn3BXYDRu0/giphy.gif',
      link: '/games/sudoku',
      component: 'app-sudoku',
    },
    {
      id: 4,
      title: 'Connect Four',
      image: 'https://mathworld.wolfram.com/images/gifs/connect4.gif',
      link: '/games/connect-four',
      component: 'app-connect-four',
    },
  ]);

  resetSelectedGame() {
    this.selectedGame.set(null);
  }
}
