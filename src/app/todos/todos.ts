import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todoService';
import { Todo as TodoType } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';

@Component({
  selector: 'app-todos',
  imports: [TodoItem],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {
  todoservice = inject(TodoService);
  todoitems = signal<Array<TodoType>>([]);

  ngOnInit(): void {
    this.todoservice.getTodosFromApi().pipe(catchError((error) => {
      console.error(error);
      throw error;
    })
  )
  .subscribe((todos) => {
      this.todoitems.set(todos);
    });
  }

  updateTodoItem(todoitem: TodoType) {
    this.todoitems.update((todos) => {
      return todos.map((todo) => {
        if (todo.id === todoitem.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    });
  }
}

