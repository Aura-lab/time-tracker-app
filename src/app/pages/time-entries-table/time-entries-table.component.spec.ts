import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeEntriesTableComponent } from './time-entries-table.component';

describe('TimeEntriesTable', () => {
  let component: TimeEntriesTableComponent;
  let fixture: ComponentFixture<TimeEntriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeEntriesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeEntriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
