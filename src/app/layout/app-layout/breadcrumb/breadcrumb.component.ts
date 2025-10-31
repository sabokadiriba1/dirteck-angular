// src/app/layout/breadcrumb/breadcrumb.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ChevronRight, Home } from 'lucide-angular';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  path?: string;
  active?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  imports: [CommonModule, LucideAngularModule,RouterModule]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [
    { label: 'Home', path: '/', active: false },
    { label: 'Dashboard', path: '/dashboard', active: true }
  ];

  homeIcon = Home;
  chevronRightIcon = ChevronRight;
}