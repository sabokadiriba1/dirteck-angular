// src/app/shared/components/feedback/notifications-panel/notifications-panel.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notification, NotificationCategory } from './models/notification';
import { UserAvatarComponent } from '../../user/user-avatar/user-avatar.component';
import { LucideAngularModule, Bell, Settings, Check, Trash2, MoreHorizontal, Clock, AlertTriangle, CheckCircle, Users, FileText, Shield } from 'lucide-angular';

@Component({
  selector: 'app-notifications-panel',
  templateUrl: './notifications-panel.component.html',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, LucideAngularModule]
})
export class NotificationsPanelComponent implements OnInit {
  @Input() isOpen: boolean = false;
  @Input() position: 'left' | 'right' = 'right';
  
  @Output() panelClose = new EventEmitter<void>();
  @Output() notificationRead = new EventEmitter<string>();
  @Output() notificationAction = new EventEmitter<{notificationId: string, action: string}>();
  @Output() markAllRead = new EventEmitter<void>();
  @Output() clearAll = new EventEmitter<void>();

  // Icons
  bellIcon = Bell;
  settingsIcon = Settings;
  checkIcon = Check;
  trashIcon = Trash2;
  moreIcon = MoreHorizontal;
  clockIcon = Clock;
  alertIcon = AlertTriangle;
  checkCircleIcon = CheckCircle;
  usersIcon = Users;
  fileTextIcon = FileText;
  shieldIcon = Shield;
  
  // Component state
  activeCategory: string = 'all';
  notifications: Notification[] = [];
  categories: NotificationCategory[] = [];

  ngOnInit() {
    this.initializeNotifications();
    this.initializeCategories();
  }

  private initializeNotifications() {
    this.notifications = [
      {
        id: '1',
        type: 'task',
        priority: 'high',
        title: 'New Task Assigned',
        message: 'Complete Q4 Sales Report analysis and presentation',
        timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(), // 5 minutes ago
        read: false,
        sender: {
          name: 'Sarah Wilson',
          role: 'Sales Manager'
        },
        action: {
          label: 'View Task',
          handler: () => this.viewTask('task-123'),
          variant: 'primary'
        },
        relatedEntity: {
          type: 'task',
          id: 'task-123',
          name: 'Q4 Sales Report'
        },
        module: 'sales'
      },
      {
        id: '2',
        type: 'alert',
        priority: 'critical',
        title: 'Inventory Alert',
        message: 'Wireless Headphones stock is below minimum threshold',
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 minutes ago
        read: false,
        action: {
          label: 'View Product',
          handler: () => this.viewProduct('prod-456'),
          variant: 'primary'
        },
        relatedEntity: {
          type: 'product',
          id: 'prod-456',
          name: 'Wireless Headphones'
        },
        module: 'inventory'
      },
      {
        id: '3',
        type: 'approval',
        priority: 'high',
        title: 'Approval Required',
        message: 'Purchase Order #PO-2024-001 for $2,450.00 requires your approval',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        read: true,
        sender: {
          name: 'Mike Johnson',
          role: 'Procurement'
        },
        action: {
          label: 'Review',
          handler: () => this.reviewPurchaseOrder('po-2024-001'),
          variant: 'primary'
        },
        relatedEntity: {
          type: 'purchase_order',
          id: 'po-2024-001',
          name: 'PO-2024-001'
        },
        module: 'accounting'
      },
      {
        id: '4',
        type: 'team',
        priority: 'medium',
        title: 'Team Update',
        message: 'New document "Project Requirements v2" was shared with you',
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
        read: true,
        sender: {
          name: 'Emily Davis',
          role: 'Project Manager'
        },
        action: {
          label: 'View Document',
          handler: () => this.viewDocument('doc-789'),
          variant: 'secondary'
        },
        module: 'projects'
      },
      {
        id: '5',
        type: 'system',
        priority: 'low',
        title: 'System Maintenance',
        message: 'Scheduled maintenance this Saturday from 2:00 AM to 4:00 AM',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        read: true,
        module: 'projects'
      }
    ];
  }

  private initializeCategories() {
    const unreadCount = this.notifications.filter(n => !n.read).length;
    const systemCount = this.notifications.filter(n => n.type === 'system').length;
    const teamCount = this.notifications.filter(n => n.type === 'team').length;
    const taskCount = this.notifications.filter(n => n.type === 'task').length;
    const approvalCount = this.notifications.filter(n => n.type === 'approval').length;

    this.categories = [
      { id: 'all', label: 'All Notifications', count: this.notifications.length, icon: 'bell' },
      { id: 'unread', label: 'Unread', count: unreadCount, icon: 'circle' },
      { id: 'system', label: 'System', count: systemCount, icon: 'shield' },
      { id: 'team', label: 'Team', count: teamCount, icon: 'users' },
      { id: 'tasks', label: 'Tasks', count: taskCount, icon: 'file-text' },
      { id: 'approvals', label: 'Approvals', count: approvalCount, icon: 'check-circle' }
    ];
  }

  // Filter notifications by category
  get filteredNotifications(): Notification[] {
    if (this.activeCategory === 'all') {
      return this.notifications;
    }
    
    if (this.activeCategory === 'unread') {
      return this.notifications.filter(n => !n.read);
    }

    return this.notifications.filter(n => n.type === this.activeCategory);
  }

  // Get notification icon based on type
  getNotificationIcon(notification: Notification): any {
    const iconMap = {
      system: this.shieldIcon,
      task: this.fileTextIcon,
      approval: this.checkCircleIcon,
      team: this.usersIcon,
      alert: this.alertIcon,
      report: this.fileTextIcon
    };
    return iconMap[notification.type];
  }

  // Get priority color
  
  getPriorityColor(priority: 'low' | 'medium' | 'high' | 'critical'): string {
    const colorMap = {
      low: 'text-gray-400',
      medium: 'text-blue-500',
      high: 'text-orange-500',
      critical: 'text-red-500'
    };
    return colorMap[priority];
  }

  // Get priority background color
  getPriorityBgColor(priority: 'low' | 'medium' | 'high' | 'critical'): string {
    const colorMap = {
      low: 'bg-gray-100 dark:bg-gray-700',
      medium: 'bg-blue-50 dark:bg-blue-900/20',
      high: 'bg-orange-50 dark:bg-orange-900/20',
      critical: 'bg-red-50 dark:bg-red-900/20'
    };
    return colorMap[priority];
  }

  // Format relative time
  getRelativeTime(timestamp: string): string {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  }

  // Category management
  setActiveCategory(categoryId: string) {
    this.activeCategory = categoryId;
  }

  // Notification actions
  markAsRead(notificationId: string, event?: Event) {
    event?.stopPropagation();
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification && !notification.read) {
      notification.read = true;
      this.notificationRead.emit(notificationId);
      this.updateCategoryCounts();
    }
  }

  markAllAsRead() {
    this.notifications.forEach(notification => {
      if (!notification.read) {
        notification.read = true;
      }
    });
    this.markAllRead.emit();
    this.updateCategoryCounts();
  }

  clearNotification(notificationId: string, event: Event) {
    event.stopPropagation();
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
    this.updateCategoryCounts();
  }

  clearAllNotifications() {
    this.notifications = [];
    this.clearAll.emit();
    this.updateCategoryCounts();
  }

  onNotificationClick(notification: Notification) {
    if (!notification.read) {
      this.markAsRead(notification.id);
    }
    
    if (notification.action) {
      notification.action.handler();
    }
  }

  onActionClick(notification: Notification, event: Event) {
    event.stopPropagation();
    if (!notification.read) {
      this.markAsRead(notification.id);
    }
    
    if (notification.action) {
      notification.action.handler();
      this.notificationAction.emit({
        notificationId: notification.id,
        action: notification.action.label
      });
    }
  }

  // Close panel
  onClose() {
    this.panelClose.emit();
  }

  // Prevent closing when clicking inside
  onPanelClick(event: Event) {
    event.stopPropagation();
  }

  // Update category counts
  private updateCategoryCounts() {
    const unreadCount = this.notifications.filter(n => !n.read).length;
    const systemCount = this.notifications.filter(n => n.type === 'system').length;
    const teamCount = this.notifications.filter(n => n.type === 'team').length;
    const taskCount = this.notifications.filter(n => n.type === 'task').length;
    const approvalCount = this.notifications.filter(n => n.type === 'approval').length;

    this.categories = this.categories.map(cat => {
      const countMap = {
        'all': this.notifications.length,
        'unread': unreadCount,
        'system': systemCount,
        'team': teamCount,
        'tasks': taskCount,
        'approvals': approvalCount
      };
      return { ...cat, count: countMap[cat.id] || 0 };
    });
  }

  // Action handlers (would integrate with your app)
  private viewTask(taskId: string) {
    console.log('View task:', taskId);
    // this.router.navigate(['/tasks', taskId]);
  }

  private viewProduct(productId: string) {
    console.log('View product:', productId);
    // this.router.navigate(['/inventory', productId]);
  }

  private reviewPurchaseOrder(poId: string) {
    console.log('Review purchase order:', poId);
    // this.router.navigate(['/purchases', poId]);
  }

  private viewDocument(docId: string) {
    console.log('View document:', docId);
    // this.router.navigate(['/documents', docId]);
  }
  // In notifications-panel.component.ts - add these methods:

// Helper method to get unread count
getUnreadCount(): number {
  const unreadCategory = this.categories.find(c => c.id === 'unread');
  return unreadCategory ? unreadCategory.count : 0;
}

// Helper method to get category by ID
getCategoryById(categoryId: string): NotificationCategory | undefined {
  return this.categories.find(c => c.id === categoryId);
}
}