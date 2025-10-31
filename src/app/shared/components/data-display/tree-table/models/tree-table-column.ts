// src/app/shared/data-display/tree-table/models/tree-table-column.ts
export interface TreeTableColumn {
  key: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'currency' | 'boolean' | 'badge';
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  formatter?: (value: any, node: any) => string;
  cellClass?: (value: any, node: any) => string;
}