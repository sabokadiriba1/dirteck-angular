// src/app/shared/data-display/data-table/models/data-table-action.ts
export interface DataTableAction {
  id: string;
  label: string;
  icon?: string;
  type: 'button' | 'dropdown' | 'link';
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  visible?: (selectedRows: any[]) => boolean;
  disabled?: (selectedRows: any[]) => boolean;
  handler: (selectedRows: any[]) => void;
  confirm?: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  };
}