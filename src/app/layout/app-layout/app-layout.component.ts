// src/app/layout/app-layout/app-layout.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HeaderComponent } from '../header/header.component';



@Component({
  selector: 'app-layout',
  templateUrl: './app-layout.component.html',
  imports: [RouterOutlet, SidebarComponent, HeaderComponent]
})
export class AppLayoutComponent {
  isSidebarCollapsed = false;

  onToggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}