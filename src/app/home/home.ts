import { Component, signal, HostListener } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [Greeting, Counter],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  homeMessage = signal('Welcome to the home page!');
  inputKey = signal('');
  keyupHandler(event: KeyboardEvent) {
    this.inputKey.set(event.key);
  }
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    this.inputKey.set(event.key);
  }
}
