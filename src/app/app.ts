import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Header],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>

    
  `,
  styles: [
    `
      router-outlet {
        min-height: 93vh;
      }
    `,
  ],
})
export class App {
  protected readonly title = signal('Learning Angular');
}
