import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToDo, UpdateTodoPayload } from '../../models/todo.model';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss'
})
export class TodoDetailComponent implements OnChanges {
  @Input() todo: ToDo | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() deleted = new EventEmitter<void>();
  @Output() closed = new EventEmitter<void>();

  form: UpdateTodoPayload & { title: string } = {
    title: '', description: '', targetDate: '', assignedUserName: '', status: 'active'
  };

  saving = false;
  deleting = false;
  confirmDelete = false;
  statusOptions = ['active', 'pending', 'completed', 'cancelled'];

  constructor(private todoService: TodoService) {}

  ngOnChanges(): void {
    if (this.todo) {
      this.form = {
        title: this.todo.title,
        description: this.todo.description ?? '',
        targetDate: this.todo.targetDate
          ? new Date(this.todo.targetDate).toISOString().substring(0, 10)
          : '',
        assignedUserName: this.todo.assignedUserName ?? '',
        status: this.todo.status
      };
      this.confirmDelete = false;
    }
  }

  save(): void {
    if (!this.todo || !this.form.title.trim()) return;
    this.saving = true;
    const payload: UpdateTodoPayload = {
      title: this.form.title,
      description: this.form.description || undefined,
      targetDate: this.form.targetDate || null,
      assignedUserName: this.form.assignedUserName || undefined,
      status: this.form.status
    };
    this.todoService.update(this.todo.id, payload).subscribe({
      next: () => { this.saving = false; this.saved.emit(); },
      error: () => { this.saving = false; }
    });
  }

  remove(): void {
    if (!this.todo || !this.confirmDelete) { this.confirmDelete = true; return; }
    this.deleting = true;
    this.todoService.delete(this.todo.id).subscribe({
      next: () => { this.deleting = false; this.deleted.emit(); },
      error: () => { this.deleting = false; }
    });
  }
}
