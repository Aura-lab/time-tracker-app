import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntriesFormComponent } from './time-entries-form.component';

describe('TimeEntriesForm', () => {
  let component: TimeEntriesFormComponent;
  let fixture: ComponentFixture<TimeEntriesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeEntriesFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeEntriesFormComponent);
    component = fixture.componentInstance;

    component.entry = {
      id: 1,
      personId: 1,
      taskItemId: 1,
      date: '2025-07-05',
      hoursWorked: 2
    };

    fixture.detectChanges();
    });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
