// src/app/shared/data-display/data-table/models/data-table-column.ts
export interface DataTableColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'boolean' | 'badge' | 'action' | 'custom';
  sortable?: boolean;
  filterable?: boolean;
  visible?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'left' | 'center' | 'right';
  format?: string;
  renderer?: (value: any, row: any) => any;
  cellClass?: (value: any, row: any) => string;
  editable?: boolean;
  required?: boolean;
  validation?: (value: any, row: any) => boolean;
}