import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', pathMatch: 'full', loadComponent() {
        return import('./home/home').then(m => m.Home);
    }, },
    { path: 'todos', pathMatch: 'full', loadComponent() {
        return import('./todos/todos').then(m => m.Todos);
    }, },
    { path: 'tic-tac-toe', pathMatch: 'full', loadComponent() {
        return import('./tic-tac-toe/tic-tac-toe').then(m => m.TicTacToe);
    }, },
    { path: 'connect-four', pathMatch: 'full', loadComponent() {
        return import('./connect-four/connect-four').then(m => m.ConnectFour);
    }, },
    { path: 'games', pathMatch: 'full', loadComponent() {
        return import('./games/games').then(m => m.Games);
    }, },
    { path: 'snake', pathMatch: 'full', loadComponent() {
            return import('./snake/snake').then(m => m.Snake);
    }, },
    { path: 'minesweeper', pathMatch: 'full', loadComponent() {
            return import('./minesweeper/minesweeper').then(m => m.Minesweeper);
    }, }

    ];
