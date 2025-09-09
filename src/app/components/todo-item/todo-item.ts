import { Component, input, output } from '@angular/core';
import { Todo } from '../../models/todo.type';
import { HighlightCompletedTodo } from '../../directives/highlight-completed-todo';

@Component({
  selector: 'app-todo-item',
  imports: [HighlightCompletedTodo],
  templateUrl: './todo-item.html',
  styleUrl: './todo-item.scss',
})
export class TodoItem {
  todo = input.required<Todo>();
  todotoggled = output<Todo>();

  todoclicked() {
    this.todotoggled.emit(this.todo());
  }
}
