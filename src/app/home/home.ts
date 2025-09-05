import { Component, signal, HostListener } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Greeting, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  homeMessage = signal('👋 Hi, I\'m Noa!');
  inputKey = signal('');
  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent) {
    this.inputKey.set(event.key);
  }
}
