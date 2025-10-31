// src/app/shared/components/user/user-group-avatar/user-group-avatar.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { User } from '../model/user';

@Component({
  selector: 'app-user-group-avatar',
  templateUrl: './user-group-avatar.component.html',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent]
})
export class UserGroupAvatarComponent {
  @Input() users: User[] = [];
  @Input() maxDisplay: number = 3;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';
  @Input() overlap: boolean = true;
  @Input() showCount: boolean = true;

  get displayedUsers(): User[] {
    return this.users.slice(0, this.maxDisplay);
  }

  get remainingCount(): number {
    return Math.max(0, this.users.length - this.maxDisplay);
  }

  get overlapClasses(): string {
    if (!this.overlap) return '';

    const overlapMap = {
      xs: '-ml-1',
      sm: '-ml-1.5',
      md: '-ml-2',
      lg: '-ml-2.5',
      xl: '-ml-3'
    };
    return overlapMap[this.size];
  }
  getUserAvatarSize(): string {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm', 
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  };
  return sizes[this.size];
}
}