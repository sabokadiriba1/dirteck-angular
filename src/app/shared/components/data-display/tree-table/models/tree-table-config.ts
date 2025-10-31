import { TreeTableAction } from "./tree-table-action";

// src/app/shared/data-display/tree-table/models/tree-table-config.ts
export interface TreeTableConfig {
  selectable: boolean;
  multiSelect: boolean;
  expandable: boolean;
  showCheckboxes: boolean;
  lazyLoad: boolean;
  virtualScroll: boolean;
  rowActions: TreeTableAction[];
  bulkActions: TreeTableAction[];
  defaultExpandedLevels: number;
  indentSize: number;
  showHeader: boolean;
  showFooter: boolean;
}