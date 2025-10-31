// src/app/shared/components/card/card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

export interface CardConfig {
  title?: string;
  subtitle?: string;
  icon?: any;
  iconColor?: string;
  iconBgColor?: string;
  actions?: CardAction[];
  footer?: string;
  padding?: string;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
  border?: boolean;
  hover?: boolean;
}

export interface CardAction {
  label: string;
  action: () => void;
  icon?: any;
  variant?: 'primary' | 'secondary' | 'danger';
}

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  imports: [CommonModule, LucideAngularModule]
})
export class CardComponent {
  @Input() config: CardConfig = {};
  @Input() loading: boolean = false;
}