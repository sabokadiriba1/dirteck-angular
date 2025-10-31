// src/app/shared/data-display/data-table/models/data-table-config.ts
import { DataTableAction } from "./data-table-action";

export interface DataTableConfig {
  selectable: boolean;
  multiSelect: boolean;
  selectMode: 'single' | 'multiple' | 'checkbox';
  pagination: boolean;
  pageSize: number;
  pageSizeOptions: number[];
  sortable: boolean;
  defaultSort: { key: string; direction: 'asc' | 'desc' };
  filterable: boolean;
  globalFilter: boolean;
  columnFilters: boolean;
  actions: DataTableAction[];
  rowActions: DataTableAction[];
  bulkActions: DataTableAction[];
  resizable: boolean;
  reorderable: boolean;
  virtualScroll: boolean;
  lazyLoad: boolean;
  inlineEdit: boolean;
  expandableRows: boolean;
  striped: boolean;
  hover: boolean;
  bordered: boolean;
  condensed: boolean;
  showHeader: boolean;
  showFooter: boolean;
}