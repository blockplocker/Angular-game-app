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
    }, }
];
