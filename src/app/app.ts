import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import { TodoFormComponent } from './components/todo-form/todo-form.component';
import { ToDo } from './models/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, TodoListComponent, TodoDetailComponent, TodoFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild(TodoListComponent) listRef!: TodoListComponent;

  selectedTodo: ToDo | null = null;
  showForm = false;

  onTodoSelected(todo: ToDo): void {
    this.selectedTodo = todo;
    this.showForm = false;
  }

  onAddNew(): void {
    this.selectedTodo = null;
    this.showForm = true;
  }

  onSaved(): void {
    this.listRef.loadTodos();
  }

  onDeleted(): void {
    this.selectedTodo = null;
    this.listRef.loadTodos();
  }

  onCreated(): void {
    this.showForm = false;
    this.listRef.loadTodos();
  }

  onDetailClosed(): void {
    this.selectedTodo = null;
  }
}
