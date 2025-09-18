import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <main>
      <app-header></app-header>
      <router-outlet></router-outlet>
    </main>

    
  `,
  styles: [
    `
      main {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        font-family: 'Fira Sans', 'Segoe UI', sans-serif;
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('Learning Angular');
}
