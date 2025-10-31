// src/app/shared/data-display/tree-table/models/tree-table-action.ts
export interface TreeTableAction {
  id: string;
  label: string;
  icon?: string;
  variant: 'primary' | 'secondary' | 'danger' | 'ghost';
  visible?: (selectedNodes: any[]) => boolean;
  disabled?: (selectedNodes: any[]) => boolean;
  handler: (selectedNodes: any[]) => void;
  confirm?: {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
  };
}