import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './theme-toggle.component.html',
  providers: [ThemeService] // Add this line
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) {}

  toggleTheme() {
    console.log('Theme toggle button clicked');
    this.themeService.toggleTheme();
  }
}