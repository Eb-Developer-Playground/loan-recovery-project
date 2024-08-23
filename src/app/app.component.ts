import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SidebarComponent } from './views/side-bar/side-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DashboardComponent, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'] 
})
export class AppComponent {
  title = 'loan-recovery-platform';
}
