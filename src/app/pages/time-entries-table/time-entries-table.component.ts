import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeEntry } from '../../models/time-entry.model';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-time-entries-table',
  templateUrl: './time-entries-table.component.html',
  styleUrls: ['./time-entries-table.component.scss'],
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
})
export class TimeEntriesTableComponent {
  @Input() entries: TimeEntry[] = [];
  @Output() edit = new EventEmitter<TimeEntry>();
  @Output() delete = new EventEmitter<number>();

  displayedColumns: string[] = ['person', 'task', 'date', 'hours', 'actions'];

  trackById(index: number, item: TimeEntry): number {
    return item.id;
  }
}
