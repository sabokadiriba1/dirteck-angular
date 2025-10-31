// src/app/shared/components/user/profile/models/profile-data.ts
export interface ProfileData {
  personalInfo: PersonalInfo;
  accountSettings: AccountSettings;
  notificationPreferences: NotificationPreferences;
  teamRoles: TeamRoles;
  activityLog: ActivityLog[];
}

export interface PersonalInfo {
  id: string | number;
  avatar?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  department?: string;
  employeeId?: string;
  workAddress?: Address;
  personalAddress?: Address;
  emergencyContact?: EmergencyContact;
  dateOfBirth?: string;
  gender?: string;
  nationality?: string;
  language: string;
  timezone: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface EmergencyContact {
  name: string;
  relationship: string;
  phone: string;
  email?: string;
}

export interface AccountSettings {
  security: SecuritySettings;
  preferences: UserPreferences;
  accessibility: AccessibilitySettings;
}

export interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginHistory: LoginRecord[];
  activeSessions: Session[];
}

export interface LoginRecord {
  date: string;
  device: string;
  ip: string;
  location: string;
  success: boolean;
}

export interface Session {
  id: string;
  device: string;
  ip: string;
  lastActive: string;
  location: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  dateFormat: string;
  timeFormat: string;
  defaultDashboard: string;
}

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large';
  highContrast: boolean;
  reducedMotion: boolean;
}

export interface NotificationPreferences {
  channels: NotificationChannels;
  types: NotificationTypes;
  frequency: NotificationFrequency;
}

export interface NotificationChannels {
  email: boolean;
  push: boolean;
  sms: boolean;
  desktop: boolean;
  inApp: boolean;
}

export interface NotificationTypes {
  systemAlerts: boolean;
  taskAssignments: boolean;
  approvalRequests: boolean;
  reports: boolean;
  securityAlerts: boolean;
  teamUpdates: boolean;
}

export interface NotificationFrequency {
  systemAlerts: 'realtime' | 'digest' | 'none';
  taskUpdates: 'realtime' | 'digest' | 'none';
  reports: 'realtime' | 'digest' | 'none';
}

export interface TeamRoles {
  team: TeamInfo;
  roles: RoleInfo[];
  organization: OrganizationInfo;
}

export interface TeamInfo {
  teamMembers: TeamMember[];
  directReports: TeamMember[];
  manager?: TeamMember;
  department: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  email: string;
}

export interface RoleInfo {
  id: string;
  name: string;
  permissions: string[];
  moduleAccess: string[];
  dataScope: string;
  approvalLimit?: number;
}

export interface OrganizationInfo {
  company: string;
  branch?: string;
  costCenter?: string;
  employeeType: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  action: string;
  module: string;
  details: string;
  ip?: string;
  device?: string;
}