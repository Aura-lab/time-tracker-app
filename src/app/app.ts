import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module'; 

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss'] 
})
export class App {
  protected title = 'time-tracker-app';
}
