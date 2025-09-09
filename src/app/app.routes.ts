import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent() {
      return import('./home/home').then((m) => m.Home);
    },
  },
  {
    path: 'houses',
    pathMatch: 'full',
    loadComponent() {
      return import('./houses/houses').then((m) => m.Houses);
    },
  },
  {
    path: 'details/:id',
    pathMatch: 'full',
    loadComponent() {
      return import('./details/details').then((m) => m.Details);
    },
  },
  {
    path: 'todos',
    pathMatch: 'full',
    loadComponent() {
      return import('./todos/todos').then((m) => m.Todos);
    },
  },
  {
    path: 'games',
    pathMatch: 'full',
    loadComponent() {
      return import('./games/games').then((m) => m.Games);
    },
  },
  {
    path: 'finances',
    pathMatch: 'full',
    loadComponent() {
      return import('./finances/finances').then((m) => m.Finances);
    },
  }

];
