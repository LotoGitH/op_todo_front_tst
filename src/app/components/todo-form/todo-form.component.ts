import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { CreateTodoPayload } from '../../models/todo.model';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss'
})
export class TodoFormComponent {
  @Output() created = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  form: CreateTodoPayload = { title: '', description: '', targetDate: '', assignedUserName: '' };
  saving = false;
  error = '';

  constructor(private todoService: TodoService) {}

  submit(): void {
    if (!this.form.title.trim()) { this.error = 'El título es obligatorio'; return; }
    this.saving = true;
    this.error = '';
    const payload: CreateTodoPayload = {
      title: this.form.title.trim(),
      description: this.form.description || undefined,
      targetDate: this.form.targetDate || undefined,
      assignedUserName: this.form.assignedUserName || undefined
    };
    this.todoService.create(payload).subscribe({
      next: () => {
        this.saving = false;
        this.form = { title: '', description: '', targetDate: '', assignedUserName: '' };
        this.created.emit();
      },
      error: () => { this.saving = false; this.error = 'Error al crear la tarea'; }
    });
  }
}
