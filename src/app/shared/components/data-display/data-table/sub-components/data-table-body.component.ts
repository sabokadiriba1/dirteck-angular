// src/app/shared/data-display/data-table/sub-components/data-table-body/data-table-body.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableColumn } from '../models/data-table-column';
import { DataTableConfig } from '../models/data-table-config';
import { DataTableAction } from '../models/data-table-action';


@Component({
  selector: 'app-data-table-body',
  templateUrl: './data-table-body.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DataTableBodyComponent {
  @Input() data: any[] = [];
  @Input() columns: DataTableColumn[] = [];
  @Input() config!: DataTableConfig;
  @Input() loading: boolean = false;
  @Input() selectedRows: any[] = [];
  @Input() sortedColumn: string = '';
  @Input() sortDirection: 'asc' | 'desc' = 'asc';
  @Input() expandedRows: Set<any> = new Set();
  @Input() columnWidths: { [key: string]: number } = {};
  
  // Function inputs
  @Input() getRowId!: (row: any) => any;
  @Input() isRowSelected!: (row: any) => boolean;
  @Input() isRowExpanded!: (row: any) => boolean;
  @Input() getColumnWidth!: (column: DataTableColumn) => string;
  @Input() get allSelected(): boolean { return false; }
  @Input() get someSelected(): boolean { return false; }

  @Output() sort = new EventEmitter<DataTableColumn>();
  @Output() rowSelectionChange = new EventEmitter<any>();
  @Output() allSelectionChange = new EventEmitter<boolean>();
  @Output() action = new EventEmitter<{action: DataTableAction; row: any}>();
  @Output() inlineEdit = new EventEmitter<{row: any; field: string; value: any}>();
  @Output() rowExpand = new EventEmitter<any>();

  onSortClick(column: DataTableColumn) {
    this.sort.emit(column);
  }

  onRowClick(row: any) {
    this.rowSelectionChange.emit(row);
  }

  onSelectAllChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.allSelectionChange.emit(checked);
  }

  onRowSelectChange(event: Event, row: any) {
    event.stopPropagation();
    this.rowSelectionChange.emit(row);
  }

  onActionClick(action: DataTableAction, row: any, event: Event) {
    event.stopPropagation();
    this.action.emit({ action, row });
  }

  onCellEdit(row: any, column: DataTableColumn, event: Event) {
    if (column.editable && this.config.inlineEdit) {
      const value = (event.target as HTMLInputElement).value;
      this.inlineEdit.emit({ row, field: column.key, value });
    }
  }

  onExpandClick(row: any, event: Event) {
    event.stopPropagation();
    this.rowExpand.emit(row);
  }
    getRowClass(row: any, even: boolean): string {
    const baseClass = 'transition-colors cursor-pointer';
    
    if (this.isRowSelected(row)) {
        return `${baseClass} bg-blue-50 dark:bg-blue-900/40 border-l-4 border-blue-500`;
    }
    
    if (this.config.striped && even) {
        return `${baseClass} bg-gray-50 dark:bg-gray-700/30`;
    }
    
    const hoverClass = this.config.hover ? 'hover:bg-gray-100 dark:hover:bg-gray-700' : '';
    return `${baseClass} bg-white dark:bg-gray-800 ${hoverClass}`;
    }
  // Cell rendering based on column type
  formatCellValue(column: DataTableColumn, value: any, row: any): any {
    if (column.renderer) {
      return column.renderer(value, row);
    }

    switch (column.type) {
      case 'currency':
        return this.formatCurrency(value);
      case 'date':
        return this.formatDate(value, column.format);
      case 'boolean':
        return value ? 'Yes' : 'No';
      case 'badge':
        return this.renderBadge(value, column);
      default:
        return value;
    }
  }

  formatCurrency(value: any): string {
    if (value == null) return '';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numValue);
  }

  formatDate(value: any, format?: string): string {
    if (!value) return '';
    const date = new Date(value);
    if (isNaN(date.getTime())) return String(value);
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  renderBadge(value: any, column: DataTableColumn): string {
    const badgeClass = this.getBadgeClass(value);
    return `<span class="px-2 py-1 text-xs font-medium rounded-full ${badgeClass}">${value}</span>`;
  }

  getBadgeClass(value: any): string {
    const status = String(value).toLowerCase();
    switch (status) {
      case 'active':
      case 'completed':
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'pending':
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'inactive':
      case 'cancelled':
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  }

  getCellClass(column: DataTableColumn, value: any, row: any): string {
    const baseClass = 'px-4 py-4 text-sm whitespace-nowrap';
    const alignClass = `text-${column.align || 'left'}`;
    
    if (column.cellClass) {
      return `${baseClass} ${alignClass} ${column.cellClass(value, row)}`;
    }
    
    return `${baseClass} ${alignClass} text-gray-900 dark:text-gray-100`;
  }

  // Check if action should be visible
  isActionVisible(action: DataTableAction, row?: any): boolean {
    if (!action.visible) return true;
    const data = row ? [row] : this.selectedRows;
    return action.visible(data);
  }

  isActionDisabled(action: DataTableAction, row?: any): boolean {
    if (!action.disabled) return false;
    const data = row ? [row] : this.selectedRows;
    return action.disabled(data);
  }
}