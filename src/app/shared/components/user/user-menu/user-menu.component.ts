// src/app/shared/components/user/user-menu/user-menu.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

import { LucideAngularModule, Settings, LogOut, User as UserIcon, Moon, Sun, Bell, Shield } from 'lucide-angular';
import { User } from '../model/user';
import { ThemeService } from '../../../../services/theme.service';

export interface UserMenuItem {
  id: string;
  label: string;
  icon?: any;
  variant?: 'default' | 'danger';
  divider?: boolean;
  handler?: () => void;
}

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, LucideAngularModule]
})
export class UserMenuComponent {
  @Input() user!: User;
  @Input() isOpen: boolean = false;
  @Input() position: 'left' | 'right' = 'right';
  
  @Output() menuToggle = new EventEmitter<boolean>();
  @Output() menuItemClick = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
  @Output() themeToggle = new EventEmitter<void>();

  // Icons
  settingsIcon = Settings;
  logoutIcon = LogOut;
  userIcon = UserIcon;
  moonIcon = Moon;
  sunIcon = Sun;
  bellIcon = Bell;
  shieldIcon = Shield;

  constructor(public themeService: ThemeService) {}

  // Menu items configuration
  get menuItems(): UserMenuItem[] {
    return [
      {
        id: 'profile',
        label: 'My Profile',
        icon: this.userIcon,
        handler: () => this.onMenuItemClick('profile')
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: this.settingsIcon,
        handler: () => this.onMenuItemClick('settings')
      },
      {
        id: 'notifications',
        label: 'Notifications',
        icon: this.bellIcon,
        handler: () => this.onMenuItemClick('notifications')
      },
      {
        id: 'divider-1',
        label: '',
        divider: true
      },
      {
        id: 'theme',
        label: this.themeService.isDarkMode ? 'Light Mode' : 'Dark Mode',
        icon: this.themeService.isDarkMode ? this.sunIcon : this.moonIcon,
        handler: () => this.onThemeToggle()
      },
      {
        id: 'divider-2',
        label: '',
        divider: true
      },
      {
        id: 'logout',
        label: 'Sign Out',
        icon: this.logoutIcon,
        variant: 'danger',
        handler: () => this.onLogout()
      }
    ];
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
    this.menuToggle.emit(this.isOpen);
  }

  onMenuItemClick(itemId: string) {
    this.menuItemClick.emit(itemId);
    this.isOpen = false;
    
    // Execute handler if provided
    const item = this.menuItems.find(menuItem => menuItem.id === itemId);
    if (item?.handler) {
      item.handler();
    }
  }

  onThemeToggle() {
    this.themeService.toggleTheme();
    this.themeToggle.emit();
  }

  onLogout() {
    this.logout.emit();
    this.isOpen = false;
  }

  // Close menu when clicking outside
  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('user-menu-backdrop')) {
      this.isOpen = false;
      this.menuToggle.emit(false);
    }
  }
}