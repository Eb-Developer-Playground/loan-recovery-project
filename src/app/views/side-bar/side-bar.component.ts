import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../logout/logout.component';

type HiddenState = {
  accessManagement: boolean;
  loans: boolean;
  reports: boolean;
};

@Component({
  selector: 'app-side-bar',
  standalone: true,
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.sass'],
  imports: [
    RouterLink,
    RouterLinkActive,
    LogoutComponent
  ]
})
export class SidebarComponent implements OnInit {
  @Input() sidebarOpen: boolean = false;
  isHidden: HiddenState = {
    accessManagement: true,
    loans: true,
    reports: true
  };

  ngOnInit() {
    console.log('SidebarComponent initialized');
  }

  toggleSection(section: keyof HiddenState) {
    this.isHidden[section] = !this.isHidden[section];
  }
}
