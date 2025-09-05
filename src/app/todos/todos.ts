import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoService } from '../services/todoService';
import { Todo as TodoType } from '../model/todo.type';
import { catchError } from 'rxjs';
import { TodoItem } from '../components/todo-item/todo-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todos',
  imports: [TodoItem, FormsModule],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos implements OnInit {
  todoservice = inject(TodoService);
  todoitems = signal<Array<TodoType>>([]);
  newTodoTitle = '';
  
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
addTodoItem() {
  if (this.newTodoTitle.trim()) {
    const newTodo: TodoType = {
      id: Date.now(),
      userId: 1,
      title: this.newTodoTitle,
      completed: false
    };
    this.todoitems.update((todos) => [newTodo, ...todos]);
    this.newTodoTitle = '';
  }
}

clearCompleted() {
  this.todoitems.update((todos) => todos.filter((todo) => !todo.completed));
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

