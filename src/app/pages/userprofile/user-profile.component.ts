// src/app/shared/components/user/user-profile/user-profile.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LucideAngularModule, Edit3, Save, X, Upload, Mail, Phone, MapPin, Calendar, Users, Shield, Bell, Activity, Briefcase, Globe, Clock } from 'lucide-angular';
import { UserAvatarComponent } from '../../shared/components/user/user-avatar/user-avatar.component';
import { ThemeService } from '../../services/theme.service';

export interface UserProfileData {
  id: string | number;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  department?: string;
  employeeId?: string;
  workAddress?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  language: string;
  timezone: string;
  joinDate?: string;
  lastLogin?: string;
  status?: 'active' | 'inactive' | 'away';
}

export type UserProfileTab = 'overview' | 'personal' | 'job' | 'settings';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, UserAvatarComponent, LucideAngularModule]
})
export class UserProfileComponent implements OnInit {
  @Input() userData!: UserProfileData;
  @Input() isOpen: boolean = false;
  @Input() showEdit: boolean = true;
  
  @Output() profileClose = new EventEmitter<void>();
  @Output() profileSave = new EventEmitter<UserProfileData>();
  @Output() avatarChange = new EventEmitter<File>();

  // Icons
  editIcon = Edit3;
  saveIcon = Save;
  closeIcon = X;
  uploadIcon = Upload;
  mailIcon = Mail;
  phoneIcon = Phone;
  mapPinIcon = MapPin;
  calendarIcon = Calendar;
  usersIcon = Users;
  shieldIcon = Shield;
  bellIcon = Bell;
  activityIcon = Activity;
  briefcaseIcon = Briefcase;
  globeIcon = Globe;
  clockIcon = Clock;

  // Component state
  activeTab: UserProfileTab = 'overview';
  isEditing: boolean = false;
  editedData!: UserProfileData;
  selectedFile: File | null = null;
  avatarPreview: string | null = null;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.resetForm();
  }

  // Tab management
  setActiveTab(tab: UserProfileTab) {
    this.activeTab = tab;
  }

  // Edit mode management
  startEditing() {
    this.isEditing = true;
    this.editedData = JSON.parse(JSON.stringify(this.userData));
  }

  cancelEditing() {
    this.isEditing = false;
    this.resetForm();
    this.selectedFile = null;
    this.avatarPreview = null;
  }

  saveProfile() {
    this.isEditing = false;
    this.userData = JSON.parse(JSON.stringify(this.editedData));
    
    if (this.selectedFile) {
      this.avatarChange.emit(this.selectedFile);
    }
    
    this.profileSave.emit(this.userData);
  }

  private resetForm() {
    this.editedData = JSON.parse(JSON.stringify(this.userData));
  }

  // Avatar handling
  onAvatarSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.selectedFile = file;
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.avatarPreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  // Close profile
  onClose() {
    this.isEditing = false;
    this.resetForm();
    this.selectedFile = null;
    this.avatarPreview = null;
    this.profileClose.emit();
  }

  // Getters
  get displayName(): string {
    return `${this.userData.firstName} ${this.userData.lastName}`.trim();
  }

  get currentAvatar(): string {
    return this.avatarPreview || this.userData.avatar || '';
  }

  get hasChanges(): boolean {
    return JSON.stringify(this.editedData) !== JSON.stringify(this.userData) || !!this.selectedFile;
  }

  getLanguageName(code: string): string {
    const languages: { [key: string]: string } = {
      'en': 'English',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese'
    };
    return languages[code] || code;
  }

  getStatusColor(status?: string): string {
    const colors: { [key: string]: string } = {
      'active': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      'inactive': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      'away': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
    };
    return colors[status || 'active'] || colors['active'];
  }
}