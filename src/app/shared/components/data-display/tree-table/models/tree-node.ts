// src/app/shared/data-display/tree-table/models/tree-node.ts
export interface TreeNode {
  id: string | number;
  parentId?: string | number | null;
  name: string;
  data: any;
  children?: TreeNode[];
  level: number;
  expanded?: boolean;
  selected?: boolean;
  indeterminate?: boolean;
  hasChildren?: boolean;
  loading?: boolean;
}