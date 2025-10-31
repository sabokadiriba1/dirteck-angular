// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      },
      { 
        path: 'userprofile', 
        loadComponent: () => import('./pages/userprofile/user-profile.component').then(m => m.UserProfileComponent) 
      },
    //   { 
    //     path: 'sales', 
    //     loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) 
    //   },
    //   { 
    //     path: 'purchases', 
    //     loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) 
    //   },
    //   { 
    //     path: 'reports', 
    //     loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) 
    //   },
    //   { 
    //     path: 'settings', 
    //     loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) 
    //   },
    ]
  }
];