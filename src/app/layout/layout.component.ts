import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../views/side-bar/side-bar.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarComponent
],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.sass'
})
export class LayoutComponent {

}
