import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms';
import { Person } from '../../models/person.model';
import { TaskItem } from '../../models/task-item.model';
import { TimeEntry } from '../../models/time-entry.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-time-entries-form',
  templateUrl: './time-entries-form.component.html',
  styleUrls: ['./time-entries-form.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ]
})
export class TimeEntriesFormComponent {
  @Input() entry!: TimeEntry;
  @Input() people: Person[] = [];
  @Input() tasks: TaskItem[] = [];
  @Input() editing = false;
  @Input() isLoading = false;
  @Input() today = new Date();
  @Output() entrySubmit  = new EventEmitter<TimeEntry>();
  @Output() entryCancel = new EventEmitter<void>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.entrySubmit.emit(this.entry);
      form.resetForm();
    }
  }

  onCancel(form: NgForm) {
    this.entryCancel.emit();
    form.resetForm();
  }
}
