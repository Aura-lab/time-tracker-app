import { Component, OnInit, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TimeEntriesApi } from '../../api/time-entries.api';
import { Person } from '../../models/person.model';
import { TaskItem } from '../../models/task-item.model';
import { TimeEntry } from '../../models/time-entry.model';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TimeEntriesTableComponent } from '../time-entries-table/time-entries-table.component';
import { TimeEntriesFormComponent } from '../time-entries-form/time-entries-form.component';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { take } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TimeEntriesTableComponent,
    TimeEntriesFormComponent,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatProgressSpinner
  ],
})
export class TimeEntriesComponent implements OnInit {
  people: Person[] = [];
  tasks: TaskItem[] = [];
  timeEntries: TimeEntry[] = [];
  entryModel: TimeEntry = this.initEntry();
  editing = false;
  today: Date = new Date();
  isLoading = false;

  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private timeEntriesApi = inject(TimeEntriesApi);

  async ngOnInit() {
    try {
      this.people = await this.timeEntriesApi.getPeople();
      this.tasks = await this.timeEntriesApi.getTasks();
      await this.loadTimeEntries();
    } catch (error) {
      this.snackBar.open(this.timeEntriesApi.handleAxiosError(error), 'Close', { duration: 3000, verticalPosition: 'top' });
    }
  }

  private initEntry(): TimeEntry {
    return { id: 0, personId: null, taskItemId: null, date: '', hoursWorked: 0 };
  }

  async loadTimeEntries() {
    this.timeEntries = await this.timeEntriesApi.getTimeEntries();
  }

  onEdit(entry: TimeEntry) {
    this.editing = true;
    this.entryModel = { ...entry };
  }

  async onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Are you sure you want to delete?' }
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(async confirmed => {
      if (confirmed) {
        this.isLoading = true;
        try {
          await this.timeEntriesApi.deleteTimeEntry(id);
          await this.loadTimeEntries();
          this.snackBar.open('Deleted successfully!', 'Close', { duration: 2000,  verticalPosition: 'top' });
        } catch (error) {
          this.snackBar.open(this.timeEntriesApi.handleAxiosError(error), 'Close', { duration: 3000,  verticalPosition: 'top' });
        } finally {
          this.isLoading = false;
        }
      }
    });
  }

  async onSubmit(entry: TimeEntry) {
    this.isLoading = true;
    try {
      if (this.editing) {
        await this.timeEntriesApi.updateTimeEntry(entry);
        this.snackBar.open('Updated successfully!', 'Close', { duration: 2000,  verticalPosition: 'top' });
      } else {
        await this.timeEntriesApi.addTimeEntry(entry);
        this.snackBar.open('Added successfully!', 'Close', { duration: 2000,  verticalPosition: 'top' });
      }
      this.entryModel = this.initEntry();
      this.editing = false;
      await this.loadTimeEntries();
    } catch (error) {
      this.snackBar.open(this.timeEntriesApi.handleAxiosError(error), 'Close', { duration: 3000,  verticalPosition: 'top' });
    } finally {
      this.isLoading = false;
    }
  }

  onCancel() {
    this.editing = false;
    this.entryModel = this.initEntry();
  }
}
