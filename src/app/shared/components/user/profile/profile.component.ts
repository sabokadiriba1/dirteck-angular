// src/app/shared/components/user/profile/profile.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProfileData, PersonalInfo, AccountSettings, NotificationPreferences, TeamRoles } from '../model/profile-data';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';

import { LucideAngularModule, Edit3, Save, X, Upload, Mail, Phone, MapPin, Calendar, Users, Shield, Bell, Activity } from 'lucide-angular';
import { ThemeService } from '../../../../services/theme.service';

export type ProfileTab = 'personal' | 'account' | 'notifications' | 'team' | 'activity';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, UserAvatarComponent, LucideAngularModule]
})
export class ProfileComponent implements OnInit {
  @Input() profileData!: ProfileData;
  @Input() isOpen: boolean = false;
  
  @Output() profileClose = new EventEmitter<void>();
  @Output() profileSave = new EventEmitter<ProfileData>();
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

  // Component state
  activeTab: ProfileTab = 'personal';
  isEditing: boolean = false;
  editedData!: ProfileData;
  selectedFile: File | null = null;
  avatarPreview: string | null = null;

  constructor(public themeService: ThemeService) {}

  ngOnInit() {
    this.resetForm();
  }

  // Tab management
  setActiveTab(tab: ProfileTab) {
    this.activeTab = tab;
  }

  // Edit mode management
  startEditing() {
    this.isEditing = true;
    this.editedData = JSON.parse(JSON.stringify(this.profileData));
  }

  cancelEditing() {
    this.isEditing = false;
    this.resetForm();
    this.selectedFile = null;
    this.avatarPreview = null;
  }

  saveProfile() {
    this.isEditing = false;
    this.profileData = JSON.parse(JSON.stringify(this.editedData));
    
    if (this.selectedFile) {
      this.avatarChange.emit(this.selectedFile);
    }
    
    this.profileSave.emit(this.profileData);
  }

  private resetForm() {
    this.editedData = JSON.parse(JSON.stringify(this.profileData));
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

  // Get current avatar URL
  get currentAvatar(): string {
    return this.avatarPreview || this.profileData.personalInfo.avatar || '';
  }

  // Get display name
  get displayName(): string {
    const { firstName, lastName } = this.profileData.personalInfo;
    return `${firstName} ${lastName}`.trim();
  }

  // Check if form has changes
  get hasChanges(): boolean {
    return JSON.stringify(this.editedData) !== JSON.stringify(this.profileData) || !!this.selectedFile;
  }
}