import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { ToDo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})
export class TodoListComponent implements OnInit {
  @Output() todoSelected = new EventEmitter<ToDo>();
  @Output() addNewClicked = new EventEmitter<void>();

  todos: ToDo[] = [];
  filtered: ToDo[] = [];
  searchQuery = '';
  loading = true;
  selectedId: number | null = null;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.loading = true;
    this.todoService.getAll().subscribe({
      next: (data) => {
        this.todos = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  applyFilter(): void {
    const q = this.searchQuery.toLowerCase();
    this.filtered = q
      ? this.todos.filter(t => t.title.toLowerCase().includes(q))
      : [...this.todos];
  }

  select(todo: ToDo): void {
    this.selectedId = todo.id;
    this.todoSelected.emit(todo);
  }

  formatDate(date?: string | null): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      active: 'is-info',
      completed: 'is-success',
      pending: 'is-warning',
      cancelled: 'is-danger'
    };
    return map[status] ?? 'is-light';
  }
}
