// src/app/shared/data-display/data-table/data-table.component.ts
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableConfig } from './models/data-table-config';
import { DataTableAction } from './models/data-table-action';

import { DataTableColumn } from './models/data-table-column';
import { DataTableHeaderComponent } from './sub-components/data-table-header.component';
import { DataTableBodyComponent } from './sub-components/data-table-body.component';
import { DataTableFooterComponent } from './sub-components/data-table-footer.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  standalone: true,
  imports: [CommonModule, DataTableHeaderComponent, DataTableBodyComponent, DataTableFooterComponent]
})
export class DataTableComponent implements OnInit, OnChanges {
  @Input() data: any[] = [];
  @Input() columns: DataTableColumn[] = [];
  @Input() config: Partial<DataTableConfig> = {};
  @Input() loading = false;
  @Input() totalRecords = 0;
  
  @Output() rowClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() sortChange = new EventEmitter<{key: string; direction: string}>();
  @Output() pageChange = new EventEmitter<{page: number; pageSize: number}>();
  @Output() filterChange = new EventEmitter<any>();
  @Output() action = new EventEmitter<{actionId: string; data: any}>();
  @Output() inlineEdit = new EventEmitter<{row: any; field: string; value: any}>();
  @Output() columnResize = new EventEmitter<{column: string; newWidth: number}>();
  @Output() columnReorder = new EventEmitter<{fromIndex: number; toIndex: number}>();

  // Internal state
  selectedRows: any[] = [];
  sortedColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 10;
  globalFilter = '';
  columnFilters: { [key: string]: any } = {};
  expandedRows: Set<any> = new Set();
  columnWidths: { [key: string]: number } = {};
  
  filteredData: any[] = [];
  displayedData: any[] = [];
 
  // Default configuration
  private defaultConfig: DataTableConfig = {
    selectable: false,
    multiSelect: false,
    selectMode: 'single',
    pagination: true,
    pageSize: 10,
    pageSizeOptions: [10, 25, 50, 100],
    sortable: true,
    defaultSort: { key: '', direction: 'asc' },
    filterable: false,
    globalFilter: false,
    columnFilters: true,
    actions: [],
    rowActions: [],
    bulkActions: [],
    resizable: false,
    reorderable: false,
    virtualScroll: false,
    lazyLoad: false,
    inlineEdit: true,
    expandableRows: true,
    striped: true,
    hover: true,
    bordered: true,
    condensed: false,
    showHeader: true,
    showFooter: true
  };

  get effectiveConfig(): DataTableConfig {
    return { ...this.defaultConfig, ...this.config };
  }

  ngOnInit() {
    this.effectiveConfig.pageSize; 
    this.initializeTable();
    this.initializeColumnWidths();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] || changes['columns']) {
      this.initializeTable();
      this.initializeColumnWidths();
    }
    
    if (changes['config']) {
      this.applyDefaultSort();
    }
  }

  private initializeTable() {
    this.applyDefaultSort();
    this.applyFilters();
    this.applySorting();
    this.updateDisplayedData();
  }

  private applyDefaultSort() {
    if (this.effectiveConfig.defaultSort?.key) {
      this.sortedColumn = this.effectiveConfig.defaultSort.key;
      this.sortDirection = this.effectiveConfig.defaultSort.direction;
    }
  }

  private initializeColumnWidths() {
    this.columns.forEach(column => {
      if (column.width && !this.columnWidths[column.key]) {
        this.columnWidths[column.key] = this.parseWidth(column.width);
      }
    });
  }

  private parseWidth(width: string): number {
    if (width.endsWith('px')) {
      return parseInt(width, 10);
    }
    return 100; // default width
  }

  // Selection handlers with selectMode support
  onRowSelectionChange(row: any) {
    if (!this.effectiveConfig.selectable) return;

    switch (this.effectiveConfig.selectMode) {
      case 'single':
        this.selectedRows = [row];
        break;
      
      case 'multiple':
        const index = this.selectedRows.findIndex(r => this.getRowId(r) === this.getRowId(row));
        if (index > -1) {
          this.selectedRows.splice(index, 1);
        } else {
          this.selectedRows.push(row);
        }
        break;
      
      case 'checkbox':
        if (this.effectiveConfig.multiSelect) {
          const checkboxIndex = this.selectedRows.findIndex(r => this.getRowId(r) === this.getRowId(row));
          if (checkboxIndex > -1) {
            this.selectedRows.splice(checkboxIndex, 1);
          } else {
            this.selectedRows.push(row);
          }
        } else {
          this.selectedRows = [row];
        }
        break;
    }
    
    this.selectionChange.emit(this.selectedRows);
  }

  onAllSelectionChange(selectAll: boolean) {
    if (this.effectiveConfig.selectable && this.effectiveConfig.multiSelect) {
      this.selectedRows = selectAll ? [...this.displayedData] : [];
      this.selectionChange.emit(this.selectedRows);
    }
  }

  // Expandable rows
  toggleRowExpansion(row: any) {
    if (!this.effectiveConfig.expandableRows) return;
    
    if (this.expandedRows.has(this.getRowId(row))) {
      this.expandedRows.delete(this.getRowId(row));
    } else {
      this.expandedRows.add(this.getRowId(row));
    }
  }

  isRowExpanded(row: any): boolean {
    return this.expandedRows.has(this.getRowId(row));
  }

  // Public methods
  getRowId(row: any): any {
    return row.id || JSON.stringify(row);
  }

  onSort(column: DataTableColumn) {
    if (!this.effectiveConfig.sortable || !column.sortable) return;

    if (this.sortedColumn === column.key) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column.key;
      this.sortDirection = 'asc';
    }

    this.applySorting();
    this.updateDisplayedData();
    this.sortChange.emit({ key: this.sortedColumn, direction: this.sortDirection });
  }

  onGlobalFilterChange(searchTerm: string) {
    this.globalFilter = searchTerm;
    this.applyFilters();
  }

  onColumnFilterChange(columnKey: string, value: any) {
    this.columnFilters[columnKey] = value;
    this.applyFilters();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updateDisplayedData();
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.currentPage = 1;
    this.updateDisplayedData();
    this.pageChange.emit({ page: this.currentPage, pageSize: this.pageSize });
  }

  onAction(action: DataTableAction, row?: any) {
    const data = row ? [row] : this.selectedRows;
    
    if (action.confirm) {
      if (confirm(action.confirm.message)) {
        action.handler(data);
      }
    } else {
      action.handler(data);
    }
    
    this.action.emit({ actionId: action.id, data });
  }

  onInlineEdit(row: any, field: string, value: any) {
    this.inlineEdit.emit({ row, field, value });
  }

  // Private methods
  private applySorting() {
    if (!this.sortedColumn) return;

    this.filteredData.sort((a, b) => {
      const aValue = a[this.sortedColumn];
      const bValue = b[this.sortedColumn];
      
      if (aValue === bValue) return 0;
      
      let comparison = 0;
      if (aValue > bValue) comparison = 1;
      if (aValue < bValue) comparison = -1;
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
  }

  private applyFilters() {
    this.filteredData = this.data.filter(row => {
      if (this.globalFilter) {
        const matchesGlobal = Object.values(row).some(value => 
          String(value).toLowerCase().includes(this.globalFilter.toLowerCase())
        );
        if (!matchesGlobal) return false;
      }

      for (const [columnKey, filterValue] of Object.entries(this.columnFilters)) {
        if (filterValue !== null && filterValue !== undefined && filterValue !== '') {
          const cellValue = row[columnKey];
          if (!String(cellValue).toLowerCase().includes(String(filterValue).toLowerCase())) {
            return false;
          }
        }
      }

      return true;
    });
   this.updateDisplayedData();
    this.filterChange.emit({
      globalFilter: this.globalFilter,
      columnFilters: this.columnFilters
    });
  }

  private updateDisplayedData() {
    if (this.effectiveConfig.pagination) {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.displayedData = this.filteredData.slice(startIndex, endIndex);
    } else {
      this.displayedData = this.filteredData;
    }
  }

  // Getters for sub-components
  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }

  get visibleColumns(): DataTableColumn[] {
    return this.columns.filter(col => col.visible !== false);
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.some(r => this.getRowId(r) === this.getRowId(row));
  }

  get allSelected(): boolean {
    return this.selectedRows.length === this.displayedData.length && this.displayedData.length > 0;
  }

  get someSelected(): boolean {
    return this.selectedRows.length > 0 && this.selectedRows.length < this.displayedData.length;
  }

  getColumnWidth(column: DataTableColumn): string {
    return this.columnWidths[column.key] ? `${this.columnWidths[column.key]}px` : (column.width || 'auto');
  }
}