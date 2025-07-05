import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeEntriesComponent } from './time-entries.component';
import { TimeEntriesApi } from '../../api/time-entries.api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

class MockTimeEntriesApi {
  getPeople = jasmine.createSpy().and.returnValue(Promise.resolve([]));
  getTasks = jasmine.createSpy().and.returnValue(Promise.resolve([]));
  getTimeEntries = jasmine.createSpy().and.returnValue(Promise.resolve([]));
  addTimeEntry = jasmine.createSpy().and.returnValue(Promise.resolve());
  updateTimeEntry = jasmine.createSpy().and.returnValue(Promise.resolve());
  deleteTimeEntry = jasmine.createSpy().and.returnValue(Promise.resolve());
  handleAxiosError = jasmine.createSpy().and.returnValue('Mock error');
}

describe('TimeEntries', () => {
  let component: TimeEntriesComponent;
  let fixture: ComponentFixture<TimeEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeEntriesComponent],
      providers: [
        { provide: TimeEntriesApi, useClass: MockTimeEntriesApi },
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy('open') } },
        { provide: MatDialog, useValue: { open: jasmine.createSpy('open') } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
