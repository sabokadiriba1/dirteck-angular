// src/app/layout/header/header.component.ts
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { LucideAngularModule, Menu, Search, Moon, Sun, Bell, User, ChevronRight, Home } from 'lucide-angular';
import { BreadcrumbComponent } from '../app-layout/breadcrumb/breadcrumb.component';
import { UserMenuComponent } from '../../shared/components/user/user-menu/user-menu.component';
import { NotificationsPanelComponent } from '../../shared/components/feedback/notifications-panel/notifications-panel.component';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}
export interface User {
  id: string | number;
  name: string;
  email?: string;
  avatar?: string;
  role?: string;
  status?: 'online' | 'offline' | 'away' | 'busy';
  initials?: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [CommonModule, LucideAngularModule,BreadcrumbComponent,UserMenuComponent, NotificationsPanelComponent ]
})
export class HeaderComponent {
  @Output() sidebarToggled = new EventEmitter<void>();
    @Input() breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Home', path: '/', active: false },
    { label: 'Dashboard', path: '/dashboard', active: true }
  ];

  // Define icons as properties
  menuIcon = Menu;
  searchIcon = Search;
  moonIcon = Moon;
  sunIcon = Sun;
  bellIcon = Bell;
  userIcon = User;
  homeIcon = Home;
  chevronRightIcon = ChevronRight;
  isUserMenuOpen = false;
  isNotificationsOpen = false;
  constructor(public themeService: ThemeService) {}
// Single user
currentUser: User = {
  id: 1,
  name: 'Sab Dir',
  email: 'john@company.com',
  role: 'Administrator',
  status: 'away',
  initials: 'SD'
};

  onToggleSidebar() {
    this.sidebarToggled.emit();
  }

  onToggleTheme() {
    this.themeService.toggleTheme();
  }
  onAvatarClick(user: User) {
 
  !this.isUserMenuOpen
   console.log('Avatar clicked:',this.isUserMenuOpen);
  // Navigate to user profile or show user details
}
 onUserMenuToggle(isOpen: boolean) {
    this.isUserMenuOpen = isOpen;
  }

  onUserMenuItemClick(itemId: string) {
    console.log('Menu item clicked:', itemId);
    
    switch (itemId) {
      case 'profile':
        // Navigate to profile
        break;
      case 'settings':
        // Navigate to settings
        break;
      case 'notifications':
        // Open notifications
        break;
    }
  }

  onUserLogout() {
    console.log('Logout clicked');
    // Implement logout logic
  }

  onThemeToggle() {
    console.log('Theme toggled from user menu');
  }
  onNotificationsToggle() {
    this.isNotificationsOpen = !this.isNotificationsOpen;
    console.log(this.isNotificationsOpen)
  }

  onNotificationsClose() {
    this.isNotificationsOpen = false;
  }

  onNotificationRead(notificationId: string) {
    console.log('Notification read:', notificationId);
  }

  onNotificationAction(event: {notificationId: string, action: string}) {
    console.log('Notification action:', event);
  }

  onMarkAllRead() {
    console.log('Mark all as read');
  }

  onClearAll() {
    console.log('Clear all notifications');
  }
}