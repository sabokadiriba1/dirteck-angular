// src/app/pages/dashboard/dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent, CardConfig } from '../../shared/components/card/card.component';
import { LucideAngularModule, 
  TrendingUp, Users, Package, ShoppingCart, DollarSign, Activity, 
  Plus, Download, Filter, Eye, Calendar, ArrowUp, ArrowDown,
  BarChart3, CreditCard, Truck, Warehouse, AlertCircle, CheckCircle } from 'lucide-angular';
import { DataTableConfig } from '../../shared/components/data-display/data-table/models/data-table-config';
import { DataTableColumn } from '../../shared/components/data-display/data-table/models/data-table-column';
import { DataTableComponent } from '../../shared/components/data-display/data-table/data-table.component';
import { TreeTableComponent } from '../../shared/components/data-display/tree-table/tree-table.component';
import { TreeTableColumn } from '../../shared/components/data-display/tree-table/models/tree-table-column';
import { TreeTableConfig } from '../../shared/components/data-display/tree-table/models/tree-table-config';
import { User } from '../../layout/header/header.component';
import { UserAvatarComponent } from '../../shared/components/user/user-avatar/user-avatar.component';
import { ProfileComponent } from '../../shared/components/user/profile/profile.component';
import { ProfileData } from '../../shared/components/user/model/profile-data';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, CardComponent, LucideAngularModule,DataTableComponent,TreeTableComponent,ProfileComponent]
})
export class DashboardComponent {
  // Icons
  trendingUpIcon = TrendingUp;
  activityIcon = Activity;
  dollarSignIcon = DollarSign;
  usersIcon = Users;
  packageIcon = Package;
  shoppingCartIcon = ShoppingCart;
  plusIcon = Plus;
  downloadIcon = Download;
  filterIcon = Filter;
  eyeIcon = Eye;
  calendarIcon = Calendar;
  arrowUpIcon = ArrowUp;
  arrowDownIcon = ArrowDown;
  barChartIcon = BarChart3;
  creditCardIcon = CreditCard;
  truckIcon = Truck;
  warehouseIcon = Warehouse;
  alertCircleIcon = AlertCircle;
  checkCircleIcon = CheckCircle;
 
  // Stats Cards Config
  statCards: CardConfig[] = [
    {
      title: 'Total Revenue',
      subtitle: '$42,567',
      icon: this.dollarSignIcon,
      iconBgColor: 'bg-green-100 dark:bg-green-900',
      iconColor: 'text-green-600 dark:text-green-400',
      footer: '+12.5% from last month',
      actions: [
        { label: 'View', icon: this.eyeIcon, action: () => this.viewRevenue(), variant: 'secondary' }
      ]
    },
    {
      title: 'Customers',
      subtitle: '2,345',
      icon: this.usersIcon,
      iconBgColor: 'bg-blue-100 dark:bg-blue-900',
      iconColor: 'text-blue-600 dark:text-blue-400',
      footer: '+8.2% from last month',
      actions: [
        { label: 'View', icon: this.eyeIcon, action: () => this.viewCustomers(), variant: 'secondary' }
      ]
    },
    {
      title: 'Orders',
      subtitle: '567',
      icon: this.shoppingCartIcon,
      iconBgColor: 'bg-purple-100 dark:bg-purple-900',
      iconColor: 'text-purple-600 dark:text-purple-400',
      footer: '+15.3% from last month',
      actions: [
        { label: 'View', icon: this.eyeIcon, action: () => this.viewOrders(), variant: 'secondary' }
      ]
    },
    {
      title: 'Inventory',
      subtitle: '1,234',
      icon: this.packageIcon,
      iconBgColor: 'bg-orange-100 dark:bg-orange-900',
      iconColor: 'text-orange-600 dark:text-orange-400',
      footer: '-3.1% from last month',
      actions: [
        { label: 'View', icon: this.eyeIcon, action: () => this.viewInventory(), variant: 'secondary' }
      ]
    }
  ];

  // Performance Metrics
  performanceMetrics = [
    { label: 'Conversion Rate', value: '3.24%', change: '+0.5%', trend: 'up' },
    { label: 'Average Order Value', value: '$124.50', change: '+$12.30', trend: 'up' },
    { label: 'Customer Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' },
    { label: 'Return Rate', value: '2.1%', change: '-0.3%', trend: 'down' }
  ];

  // Recent Activities
  recentActivities = [
    { 
      action: 'New order placed', 
      user: 'John Doe', 
      time: '2 min ago',
      type: 'order'
    },
    { 
      action: 'Inventory updated', 
      user: 'Jane Smith', 
      time: '5 min ago',
      type: 'inventory'
    },
    { 
      action: 'Payment received', 
      user: 'Mike Johnson', 
      time: '10 min ago',
      type: 'payment'
    },
    { 
      action: 'User registered', 
      user: 'Sarah Wilson', 
      time: '15 min ago',
      type: 'user'
    },
    { 
      action: 'Product low stock alert', 
      user: 'System', 
      time: '25 min ago',
      type: 'alert'
    }
  ];

  // Top Products
  topProducts = [
    { name: 'Wireless Headphones', sales: 234, revenue: '$12,450' },
    { name: 'Smart Watch', sales: 189, revenue: '$9,870' },
    { name: 'Laptop Stand', sales: 156, revenue: '$4,680' },
    { name: 'USB-C Cable', sales: 142, revenue: '$1,420' },
    { name: 'Phone Case', sales: 128, revenue: '$1,920' }
  ];

  // Pending Tasks
  pendingTasks = [
    { task: 'Approve purchase orders', priority: 'high', due: 'Today' },
    { task: 'Review inventory levels', priority: 'medium', due: 'Tomorrow' },
    { task: 'Process customer refunds', priority: 'high', due: 'Today' },
    { task: 'Update product catalog', priority: 'low', due: 'Next week' }
  ];
// Data Table Sample Data
  tableData = [
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      category: 'Electronics', 
      price: 299.99, 
      stock: 45,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 2, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: 199.99, 
      stock: 120,
      status: 'active',
      lastUpdated: '2024-01-14'
    },
    { 
      id: 3, 
      name: 'Office Chair', 
      category: 'Furniture', 
      price: 249.99, 
      stock: 12,
      status: 'low-stock',
      lastUpdated: '2024-01-13'
    },
    { 
      id: 4, 
      name: 'Desk Lamp', 
      category: 'Home', 
      price: 49.99, 
      stock: 0,
      status: 'out-of-stock',
      lastUpdated: '2024-01-12'
    },
    { 
      id: 5, 
      name: 'Notebook', 
      category: 'Stationery', 
      price: 12.99, 
      stock: 200,
      status: 'active',
      lastUpdated: '2024-01-11'
    },
      { 
      id: 6, 
      name: 'Wireless Headphones', 
      category: 'Electronics', 
      price: 299.99, 
      stock: 45,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 7, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: 199.99, 
      stock: 120,
      status: 'active',
      lastUpdated: '2024-01-14'
    },
    { 
      id: 8, 
      name: 'Office Chair', 
      category: 'Furniture', 
      price: 249.99, 
      stock: 12,
      status: 'low-stock',
      lastUpdated: '2024-01-13'
    },
    { 
      id: 9, 
      name: 'Desk Lamp', 
      category: 'Home', 
      price: 49.99, 
      stock: 0,
      status: 'out-of-stock',
      lastUpdated: '2024-01-12'
    },
    { 
      id: 10, 
      name: 'Notebook', 
      category: 'Stationery', 
      price: 12.99, 
      stock: 200,
      status: 'active',
      lastUpdated: '2024-01-11'
    },
      { 
      id: 11, 
      name: 'Wireless Headphones', 
      category: 'Electronics', 
      price: 299.99, 
      stock: 45,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 12, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: 199.99, 
      stock: 120,
      status: 'active',
      lastUpdated: '2024-01-14'
    },
    { 
      id: 13, 
      name: 'Office Chair', 
      category: 'Furniture', 
      price: 249.99, 
      stock: 12,
      status: 'low-stock',
      lastUpdated: '2024-01-13'
    },
    { 
      id: 14, 
      name: 'Desk Lamp', 
      category: 'Home', 
      price: 49.99, 
      stock: 0,
      status: 'out-of-stock',
      lastUpdated: '2024-01-12'
    },
    { 
      id: 15, 
      name: 'Notebook', 
      category: 'Stationery', 
      price: 12.99, 
      stock: 200,
      status: 'active',
      lastUpdated: '2024-01-11'
    },
      { 
      id: 21, 
      name: 'Wireless Headphones', 
      category: 'Electronics', 
      price: 299.99, 
      stock: 45,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 22, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: 199.99, 
      stock: 120,
      status: 'active',
      lastUpdated: '2024-01-14'
    },
    { 
      id: 23, 
      name: 'Office Chair', 
      category: 'Furniture', 
      price: 249.99, 
      stock: 12,
      status: 'low-stock',
      lastUpdated: '2024-01-13'
    },
    { 
      id: 24, 
      name: 'Desk Lamp', 
      category: 'Home', 
      price: 49.99, 
      stock: 0,
      status: 'out-of-stock',
      lastUpdated: '2024-01-12'
    },
    { 
      id: 25, 
      name: 'Notebook', 
      category: 'Stationery', 
      price: 12.99, 
      stock: 200,
      status: 'active',
      lastUpdated: '2024-01-11'
    },
    { 
      id: 13, 
      name: 'Office Chair', 
      category: 'Furniture', 
      price: 249.99, 
      stock: 12,
      status: 'low-stock',
      lastUpdated: '2024-01-13'
    },
    { 
      id: 14, 
      name: 'Desk Lamp', 
      category: 'Home', 
      price: 49.99, 
      stock: 0,
      status: 'out-of-stock',
      lastUpdated: '2024-01-12'
    },
    { 
      id: 15, 
      name: 'Notebook', 
      category: 'Stationery', 
      price: 12.99, 
      stock: 200,
      status: 'active',
      lastUpdated: '2024-01-11'
    },
      { 
      id: 21, 
      name: 'Wireless Headphones', 
      category: 'Electronics', 
      price: 299.99, 
      stock: 45,
      status: 'active',
      lastUpdated: '2024-01-15'
    },
    { 
      id: 22, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: 199.99, 
      stock: 120,
      status: 'active',
      lastUpdated: '2024-01-14'
    },
    { 
      id: 23, 
      name: 'Office Chair', 
      category: 'Furniture', 
      price: 249.99, 
      stock: 12,
      status: 'low-stock',
      lastUpdated: '2024-01-13'
    },
    { 
      id: 24, 
      name: 'Desk Lamp', 
      category: 'Home', 
      price: 49.99, 
      stock: 0,
      status: 'out-of-stock',
      lastUpdated: '2024-01-12'
    },
  ];

// Table Columns Configuration
tableColumns: DataTableColumn[] = [
  { 
    key: 'name', 
    label: 'Product Name', 
    type: 'text',
    sortable: true,
    filterable: true,
    width: '200px'
  },
  { 
    key: 'category', 
    label: 'Category', 
    type: 'text',
    sortable: true,
    filterable: true,
    width: '150px'
  },
  { 
    key: 'price', 
    label: 'Price', 
    type: 'currency',
    sortable: true,
    align: 'right',
    width: '120px'
  },
  { 
    key: 'stock', 
    label: 'Stock', 
    type: 'number',
    sortable: true,
    align: 'right',
    width: '100px'
  },
  { 
    key: 'status', 
    label: 'Status', 
    type: 'badge',
    sortable: true,
    filterable: true,
    width: '120px',
    renderer: (value: any) => {
      const statusConfig: any = {
        'active': { class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Active' },
        'low-stock': { class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', label: 'Low Stock' },
        'out-of-stock': { class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', label: 'Out of Stock' }
      };
      const config = statusConfig[value] || { class: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300', label: value };
      return `<span class="px-2 py-1 text-xs font-medium rounded-full ${config.class}">${config.label}</span>`;
    }
  },
  { 
    key: 'lastUpdated', 
    label: 'Last Updated', 
    type: 'date',
    sortable: true,
    width: '150px'
  },
  
];

// Table Configuration
tableConfig: Partial<DataTableConfig> = {
  selectable: true,
  multiSelect: true,
  selectMode: 'checkbox',
  pagination: true,
  pageSize: 5,
  pageSizeOptions: [5, 10, 25, 50],
  sortable: true,
  defaultSort: { key: 'name', direction: 'asc' },
  filterable: true,
  globalFilter: true,
  columnFilters: true,
  striped: true,
  hover: true,
  expandableRows:true,
  bordered: true,
  rowActions: [
    {
      id: 'edit',
      label: 'Edit Product',
      type: 'button',
      variant: 'secondary',
      handler: (data: any[]) => this.editProduct(data[0])
    },
    {
      id: 'delete',
      label: 'Delete Product',
      type: 'button',
      variant: 'danger',
      handler: (data: any[]) => this.deleteProduct(data[0]),
      confirm: {
        title: 'Delete Product',
        message: 'Are you sure you want to delete this product?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    }
  ],
  actions: [
    {
      id: 'export',
      label: 'Export Selected',
      type: 'button',
      variant: 'primary',
      handler: (data: any[]) => this.exportProducts(data),
      visible: (data: any[]) => data.length > 0
    },
    {
      id: 'bulk-delete',
      label: 'Delete Selected',
      type: 'dropdown',
      variant: 'danger',
      handler: (data: any[]) => this.bulkDeleteProducts(data),
      visible: (data: any[]) => data.length > 0,
      confirm: {
        title: 'Delete Products',
        message: 'Are you sure you want to delete selected products?',
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    }
  ]
};
// Tree Table Sample Data (Chart of Accounts style)
treeData = [
  { 
    id: 1, 
    parentId: null, 
    name: 'Assets', 
    accountType: 'Header', 
    balance: 0,
    status: 'active'
  },
  { 
    id: 2, 
    parentId: 1, 
    name: 'Current Assets', 
    accountType: 'Header', 
    balance: 0,
    status: 'active'
  },
  { 
    id: 3, 
    parentId: 2, 
    name: 'Cash and Cash Equivalents', 
    accountType: 'Asset', 
    balance: 154200,
    status: 'active'
  },
  { 
    id: 4, 
    parentId: 2, 
    name: 'Accounts Receivable', 
    accountType: 'Asset', 
    balance: 89250,
    status: 'active'
  },
  { 
    id: 5, 
    parentId: 1, 
    name: 'Fixed Assets', 
    accountType: 'Header', 
    balance: 0,
    status: 'active'
  },
  { 
    id: 6, 
    parentId: 5, 
    name: 'Property, Plant & Equipment', 
    accountType: 'Asset', 
    balance: 450000,
    status: 'active'
  },
  { 
    id: 7, 
    parentId: null, 
    name: 'Liabilities', 
    accountType: 'Header', 
    balance: 0,
    status: 'active'
  },
  { 
    id: 8, 
    parentId: 7, 
    name: 'Current Liabilities', 
    accountType: 'Header', 
    balance: 0,
    status: 'active'
  },
  { 
    id: 9, 
    parentId: 8, 
    name: 'Accounts Payable', 
    accountType: 'Liability', 
    balance: 67500,
    status: 'active'
  },
  { 
    id: 10, 
    parentId: 7, 
    name: 'Long Term Liabilities', 
    accountType: 'Header', 
    balance: 0,
    status: 'active'
  },
  { 
    id: 11, 
    parentId: 10, 
    name: 'Bank Loan', 
    accountType: 'Liability', 
    balance: 200000,
    status: 'active'
  },
  { 
    id: 12, 
    parentId: null, 
    name: 'Equity', 
    accountType: 'Header', 
    balance: 0,
    status: 'active'
  },
  { 
    id: 13, 
    parentId: 12, 
    name: 'Share Capital', 
    accountType: 'Equity', 
    balance: 300000,
    status: 'active'
  }
];

// Tree Table Columns
treeColumns: TreeTableColumn[]= [
  { 
    key: 'name', 
    label: 'Account Name', 
    type: 'text',
    width: '350px'
  },
  { 
    key: 'accountType', 
    label: 'Type', 
    type: 'badge',
    width: '120px',
    formatter: (value: any) => {
      const typeConfig: any = {
        'Header': { class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', label: 'Header' },
        'Asset': { class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', label: 'Asset' },
        'Liability': { class: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', label: 'Liability' },
        'Equity': { class: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300', label: 'Equity' }
      };
      const config = typeConfig[value] || { class: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300', label: value };
      return `<span class="px-2 py-1 text-xs font-medium rounded-full ${config.class}">${config.label}</span>`;
    }
  },
  { 
    key: 'balance', 
    label: 'Balance', 
    type: 'currency',
    align: 'right',
    width: '150px'
  },
  { 
    key: 'status', 
    label: 'Status', 
    type: 'badge',
    width: '100px',
    formatter: (value: any) => {
      return value === 'active' 
        ? '<span class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</span>'
        : '<span class="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Inactive</span>';
    }
  }
];

// Tree Table Configuration
treeConfig = {
  expandable: true,
  selectable: true,
  multiSelect: false,
  showCheckboxes: false,
  defaultExpandedLevels: 2,
  indentSize: 24,
  showHeader: true,
  showFooter: true,
  rowActions: [    
  ]
};

// Single user
currentUser: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@company.com',
  role: 'Administrator',
  status: 'online',
  initials: 'JD'
};

// User without avatar
userWithoutAvatar: User = {
  id: 2,
  name: 'Sarah Wilson',
  role: 'Manager',
  status: 'away'
};

// User group
teamMembers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/assets/avatars/john.jpg',
    status: 'online'
  },
  {
    id: 2,
    name: 'Sarah Wilson',
    status: 'away'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar: '/assets/avatars/mike.jpg',
    status: 'busy'
  },
  {
    id: 4,
    name: 'Emily Davis',
    status: 'offline'
  },
  {
    id: 5,
    name: 'Alex Brown',
    status: 'online'
  }
];
// In your dashboard.component.ts - add these properties:

// Add to imports

// Add to your DashboardComponent class:
isProfileOpen = true;

// Sample profile data - replace with your actual user data
// In your dashboard.component.ts - fix the profileData object:
profileData: ProfileData = {
  personalInfo: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    jobTitle: 'Administrator',
    department: 'IT',
    employeeId: 'ADM-001',
    language: 'en',
    timezone: 'America/New_York',
    workAddress: {
      street: '123 Business Avenue',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      postalCode: '10001'
    },
    dateOfBirth: '1985-06-15',
    gender: 'Male',
    nationality: 'American'
  },
  accountSettings: {
    security: {
      twoFactorEnabled: true,
      lastPasswordChange: '2024-01-15',
      loginHistory: [
        {
          date: '2024-01-20T10:30:00Z',
          device: 'Chrome on Windows',
          ip: '192.168.1.100',
          location: 'New York, USA',
          success: true
        }
      ],
      activeSessions: [
        {
          id: 'session-1',
          device: 'Chrome on Windows',
          ip: '192.168.1.100',
          lastActive: '2024-01-20T14:25:00Z',
          location: 'New York, USA'
        }
      ]
    },
    preferences: {
      theme: 'dark' as const,
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      defaultDashboard: 'default'
    },
    accessibility: {
      fontSize: 'medium' as const,
      highContrast: false,
      reducedMotion: false
    }
  },
  notificationPreferences: {
    channels: {
      email: true,
      push: true,
      sms: false,
      desktop: true,
      inApp: true
    },
    types: {
      systemAlerts: true,
      taskAssignments: true,
      approvalRequests: true,
      reports: false,
      securityAlerts: true,
      teamUpdates: true
    },
    frequency: {
      systemAlerts: 'realtime' as const,
      taskUpdates: 'digest' as const,
      reports: 'digest' as const
    }
  },
  teamRoles: {
    team: {
      teamMembers: [
        {
          id: '2',
          name: 'Sarah Wilson',
          role: 'Manager',
          email: 'sarah@company.com'
        },
        {
          id: '3', 
          name: 'Mike Johnson',
          role: 'Developer',
          email: 'mike@company.com'
        }
      ],
      directReports: [
        {
          id: '4',
          name: 'Emily Davis', 
          role: 'Analyst',
          email: 'emily@company.com'
        }
      ],
      manager: {
        id: '5',
        name: 'Robert Brown',
        role: 'Director',
        email: 'robert@company.com'
      },
      department: 'IT'
    },
    roles: [
      {
        id: 'admin',
        name: 'Administrator',
        permissions: ['read', 'write', 'delete', 'admin'],
        moduleAccess: ['all'],
        dataScope: 'global',
        approvalLimit: 10000
      }
    ],
    organization: {
      company: 'Your Company Inc.',
      branch: 'Headquarters',
      costCenter: 'IT-001',
      employeeType: 'Full-time'
    }
  },
  activityLog: [
    {
      id: '1',
      timestamp: '2024-01-20T14:30:00Z',
      action: 'Login',
      module: 'Authentication',
      details: 'Successful login from Chrome on Windows',
      ip: '192.168.1.100',
      device: 'Chrome on Windows'
    },
    {
      id: '2',
      timestamp: '2024-01-20T14:25:00Z',
      action: 'View Report',
      module: 'Dashboard',
      details: 'Viewed Sales Overview report',
      ip: '192.168.1.100',
      device: 'Chrome on Windows'
    }
  ]
};

// Profile event handlers
openProfile() {
  this.isProfileOpen = true;
}

onProfileClose() {
  this.isProfileOpen = false;
}

onProfileSave(updatedData: any) {
  console.log('Profile saved:', updatedData);
  this.profileData = updatedData;
  // Here you would typically send the data to your backend
  // this.userService.updateProfile(updatedData).subscribe(...);
}

onAvatarChange(file: File) {
  console.log('Avatar file selected:', file);
  // Handle avatar upload
  // this.userService.uploadAvatar(file).subscribe(...);
}

// Helper method for language display
getLanguageName(code: string): string {
  const languages: { [key: string]: string } = {
    'en': 'English',
    'es': 'Spanish', 
    'fr': 'French',
    'de': 'German'
  };
  return languages[code] || code;
}
onAvatarClick(user: User) {
  console.log('Avatar clicked:', user);
  // Navigate to user profile or show user details
}
  // Action Methods
  onNewOrder() {
    console.log('New order clicked');
  }

  onAddProduct() {
    console.log('Add product clicked');
  }

  onGenerateReport() {
    console.log('Generate report clicked');
  }

  onFilter() {
    console.log('Filter clicked');
  }

  onExport() {
    console.log('Export clicked');
  }

  viewRevenue() {
    console.log('View revenue details');
  }

  viewCustomers() {
    console.log('View customers details');
  }

  viewOrders() {
    console.log('View orders details');
  }

  viewInventory() {
    console.log('View inventory details');
  }

  getActivityIcon(type: string) {
    switch(type) {
      case 'order': return this.shoppingCartIcon;
      case 'inventory': return this.packageIcon;
      case 'payment': return this.creditCardIcon;
      case 'user': return this.usersIcon;
      case 'alert': return this.alertCircleIcon;
      default: return this.activityIcon;
    }
  }

  getActivityColor(type: string) {
    switch(type) {
      case 'order': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900';
      case 'inventory': return 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900';
      case 'payment': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900';
      case 'user': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900';
      case 'alert': return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-900';
    }
  }

  getPriorityColor(priority: string) {
    switch(priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:bg-red-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900';
    }
  }
  // Action Methods
editProduct(product: any) {
  console.log('Edit product:', product);
  // Implement edit logic
  alert(`Editing product: ${product.name}`);
}

deleteProduct(product: any) {
  console.log('Delete product:', product);
  // Implement delete logic
  this.tableData = this.tableData.filter(p => p.id !== product.id);
}

exportProducts(products: any[]) {
  console.log('Export products:', products);
  // Implement export logic
  alert(`Exporting ${products.length} products`);
}

bulkDeleteProducts(products: any[]) {
  console.log('Bulk delete products:', products);
  // Implement bulk delete logic
  const productIds = products.map(p => p.id);
  this.tableData = this.tableData.filter(p => !productIds.includes(p.id));
}

// Table Event Handlers with proper types
onTableAction(event: { actionId: string; data: any }) {
  console.log('Table action:', event);
}

onSelectionChange(selectedRows: any[]) {
  console.log('Selected rows:', selectedRows);
}

onSortChange(sortEvent: { key: string; direction: string }) {
  console.log('Sort changed:', sortEvent);
}

onPageChange(pageEvent: { page: number; pageSize: number }) {
  console.log('Page changed:', pageEvent);
}

onFilterChange(filterEvent: { globalFilter: string; columnFilters: any }) {
  console.log('Filter changed:', filterEvent);
}

// Tree Table Event Handlers
onTreeNodeClick(event: any) {
  console.log('Tree node clicked:', event);
}

onTreeSelectionChange(event: any) {
  console.log('Tree selected nodes:', event);
}

onTreeAction(event: any) {
  console.log('Tree action:', event);
}
// Tree Table Action Methods
viewAccountDetails(account: any) {
  console.log('View account details:', account);
  alert(`Viewing details for: ${account.name}`);
}

editAccount(account: any) {
  console.log('Edit account:', account);
  alert(`Editing account: ${account.name}`);
}
}