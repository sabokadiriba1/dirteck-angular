// src/app/shared/components/user/user-avatar/user-avatar.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../model/user';


@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class UserAvatarComponent {
  @Input() user!: User;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() showName: boolean = false;
  @Input() showStatus: boolean = true;
  @Input() clickable: boolean = false;
  @Input() border: boolean = false;
  @Input() rounded: 'none' | 'sm' | 'md' | 'lg' | 'full' = 'full';
  
  @Output() avatarClick = new EventEmitter<User>();

  get sizeClasses(): string {
    const sizes = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl'
    };
    return sizes[this.size];
  }

  get roundedClasses(): string {
    const roundedMap = {
      none: 'rounded-none',
      sm: 'rounded',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    };
    return roundedMap[this.rounded];
  }

  get borderClasses(): string {
    return this.border ? 'border-2 border-white dark:border-gray-800 shadow-sm' : '';
  }

  get statusClasses(): string {
    const statusMap = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
      busy: 'bg-red-500'
    };
    return statusMap[this.user?.status || 'offline'];
  }

  get statusSize(): string {
    const sizes = {
      xs: 'w-1.5 h-1.5',
      sm: 'w-2 h-2',
      md: 'w-2.5 h-2.5',
      lg: 'w-3 h-3',
      xl: 'w-4 h-4'
    };
    return sizes[this.size];
  }

  get statusPosition(): string {
    const positions = {
      xs: '-bottom-0.5 -right-0.5',
      sm: '-bottom-0.5 -right-0.5',
      md: '-bottom-1 -right-1',
      lg: '-bottom-1 -right-1',
      xl: '-bottom-1.5 -right-1.5'
    };
    return positions[this.size];
  }

  get backgroundColor(): string {
    // Generate consistent color based on user ID or name
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
      'bg-orange-500', 'bg-teal-500', 'bg-cyan-500', 'bg-indigo-500'
    ];
    
    if (this.user?.id) {
      const index = Math.abs(this.hashCode(String(this.user.id))) % colors.length;
      return colors[index];
    }
    
    return 'bg-gray-500';
  }

  get displayText(): string {
    if (this.user?.avatar) return '';
    
    if (this.user?.initials) {
      return this.user.initials;
    }
    
    if (this.user?.name) {
      return this.getInitials(this.user.name);
    }
    
    return '?';
  }

  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
  }

  private getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  onAvatarClick() {
    if (this.clickable) {
      this.avatarClick.emit(this.user);
    }
  }
}