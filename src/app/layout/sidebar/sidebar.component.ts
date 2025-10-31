// src/app/layout/sidebar/sidebar.component.ts
import { Component, Output, EventEmitter, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, LayoutDashboard, Package, ShoppingCart, Receipt, BarChart3, Settings, ChevronLeft } from 'lucide-angular';

interface NavItem {
  label: string;
  icon: any;
  path: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: [], 
  imports: [CommonModule, LucideAngularModule]
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isCollapsed: boolean = false;
  isMobile = false;

  // Define icons as properties
  chevronLeftIcon = ChevronLeft;
  
  navItems: NavItem[] = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Inventory', icon: Package, path: '/inventory' },
    { label: 'Sales', icon: ShoppingCart, path: '/sales' },
    { label: 'Purchases', icon: Receipt, path: '/purchases' },
    { label: 'Reports', icon: BarChart3, path: '/reports' },
    { label: 'Settings', icon: Settings, path: '/settings' }
  ];

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.checkMobile();
  }

  ngOnInit() {
    this.checkMobile();
  }

  private checkMobile() {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isCollapsed = true;
    }
  }

  toggle() { 
    this.toggleSidebar.emit();
  }

  closeOnMobile() {
    if (this.isMobile) {
      this.isCollapsed = true;
      this.toggleSidebar.emit();
    }
  }
}