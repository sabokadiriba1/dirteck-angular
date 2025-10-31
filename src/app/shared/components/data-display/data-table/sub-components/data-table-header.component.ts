// src/app/shared/data-display/data-table/sub-components/data-table-header/data-table-header.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTableConfig } from '../models/data-table-config';
import { DataTableColumn } from '../models/data-table-column';
import { DataTableAction } from '../models/data-table-action';


@Component({
  selector: 'app-data-table-header',
  templateUrl: './data-table-header.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DataTableHeaderComponent {
  @Input() config!: DataTableConfig;
  @Input() selectedRows: any[] = [];
  @Input() globalFilter: string = '';
  @Input() columns: DataTableColumn[] = [];
  @Input() columnFilters: { [key: string]: any } = {};

  @Output() globalFilterChange = new EventEmitter<string>();
  @Output() columnFilterChange = new EventEmitter<{key: string; value: any}>();
  @Output() action = new EventEmitter<DataTableAction>();

  onGlobalSearchChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.globalFilterChange.emit(value);
  }

  onColumnFilterInput(columnKey: string, event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.columnFilterChange.emit({ key: columnKey, value });
  }

  onActionClick(action: DataTableAction) {
    this.action.emit(action);
  }

  // Check if action should be visible
  isActionVisible(action: DataTableAction): boolean {
    if (!action.visible) return true;
    return action.visible(this.selectedRows);
  }

  isActionDisabled(action: DataTableAction): boolean {
    if (!action.disabled) return false;
    return action.disabled(this.selectedRows);
  }
}