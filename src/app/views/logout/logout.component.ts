import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.sass'],
  standalone: true
})
export class LogoutComponent {
  
  constructor(private router: Router) {
    
  }

  performLogout(): void {
    // Clear user data
    localStorage.removeItem('isLoggedIn');
    
    // Redirect to the login page
    this.router.navigate(['/login']);
  }
}
