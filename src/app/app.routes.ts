import { Routes } from '@angular/router';
import { TimeEntriesComponent } from './pages/time-entries/time-entries.component';

export const routes: Routes = [
  { path: '', redirectTo: 'time-entries', pathMatch: 'full' },
  { path: 'time-entries', component: TimeEntriesComponent },
];
