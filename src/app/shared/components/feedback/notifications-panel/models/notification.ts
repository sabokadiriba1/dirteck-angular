// src/app/shared/components/feedback/notifications-panel/models/notification.ts
export interface Notification {
  id: string;
  type: 'system' | 'task' | 'approval' | 'team' | 'alert' | 'report';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  sender?: {
    name: string;
    avatar?: string;
    role?: string;
  };
  action?: {
    label: string;
    handler: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
  };
  relatedEntity?: {
    type: string;
    id: string;
    name: string;
  };
  expiresAt?: string;
  module?: 'sales' | 'inventory' | 'accounting' | 'hr' | 'projects';
}

export interface NotificationCategory {
  id: 'all' | 'unread' | 'system' | 'team' | 'tasks' | 'approvals';
  label: string;
  count: number;
  icon: string;
}

export interface NotificationPreferences {
  enabled: boolean;
  sounds: boolean;
  desktopAlerts: boolean;
  emailDigest: boolean;
  quietHours: {
    enabled: boolean;
    start: string;
    end: string;
  };
}