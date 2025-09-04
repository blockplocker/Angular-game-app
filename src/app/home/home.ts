import { Component, signal, HostListener } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Greeting, Counter, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  homeMessage = signal('👋 Hi, I\'m Noa!');
  inputKey = signal('');
  keyupHandler(event: KeyboardEvent) {
    this.inputKey.set(event.key);
  }
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    this.inputKey.set(event.key);
  }
}
