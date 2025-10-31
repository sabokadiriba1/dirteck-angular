// src/app/shared/data-display/tree-table/tree-table.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeTableConfig } from './models/tree-table-config';
import { TreeTableColumn } from './models/tree-table-column';
import { TreeTableAction } from './models/tree-table-action';
import { TreeNode } from './models/tree-node';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class TreeTableComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: TreeTableColumn[] = [];
  @Input() config: Partial<TreeTableConfig> = {};
  @Input() loading = false;
  
  @Output() nodeClick = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() expandChange = new EventEmitter<any>();
  @Output() action = new EventEmitter<{actionId: string; data: any}>();

  // Internal state
  treeNodes: TreeNode[] = [];
  selectedNodes: TreeNode[] = [];
  expandedNodes: Set<string | number> = new Set();
  filteredNodes: TreeNode[] = [];
  searchTerm = '';

  // Default configuration
  private defaultConfig: TreeTableConfig = {
    selectable: true,
    multiSelect: false,
    expandable: true,
    showCheckboxes: false,
    lazyLoad: false,
    virtualScroll: false,
    rowActions: [],
    bulkActions: [],
    defaultExpandedLevels: 1,
    indentSize: 20,
    showHeader: true,
    showFooter: false
  };

  get effectiveConfig(): TreeTableConfig {
    return { ...this.defaultConfig, ...this.config };
  }

  ngOnInit() {
    this.buildTree();
  }

  // Build tree structure from flat data
  private buildTree() {
    const nodeMap = new Map();
    const roots: TreeNode[] = [];

    // Create all nodes
    this.data.forEach(item => {
      const node: TreeNode = {
        id: item.id,
        parentId: item.parentId,
        name: item.name || item.label,
        data: item,
        level: 0,
        expanded: false,
        selected: false,
        hasChildren: false
      };
      nodeMap.set(item.id, node);
    });

    // Build hierarchy and set levels
    nodeMap.forEach(node => {
      if (node.parentId && nodeMap.has(node.parentId)) {
        const parent = nodeMap.get(node.parentId);
        if (!parent.children) parent.children = [];
        parent.children.push(node);
        node.level = parent.level + 1;
        parent.hasChildren = true;
      } else {
        roots.push(node);
      }
    });

    this.treeNodes = roots;
    this.applyDefaultExpansion();
    this.filteredNodes = this.flattenTree(this.treeNodes);
  }

  // Flatten tree for display with proper ordering
  private flattenTree(nodes: TreeNode[]): TreeNode[] {
    const result: TreeNode[] = [];
    
    const flatten = (nodeList: TreeNode[]) => {
      nodeList.forEach(node => {
        result.push(node);
        if (node.expanded && node.children) {
          flatten(node.children);
        }
      });
    };

    flatten(nodes);
    return result;
  }

  // Expand first few levels by default
  private applyDefaultExpansion() {
    const expandNodes = (nodes: TreeNode[], level: number) => {
      nodes.forEach(node => {
        if (level < this.effectiveConfig.defaultExpandedLevels) {
          node.expanded = true;
          this.expandedNodes.add(node.id);
        }
        if (node.children) {
          expandNodes(node.children, level + 1);
        }
      });
    };

    expandNodes(this.treeNodes, 0);
  }

  // Toggle node expansion
  toggleNode(node: TreeNode) {
    if (!this.effectiveConfig.expandable || !node.hasChildren) return;

    node.expanded = !node.expanded;
    
    if (node.expanded) {
      this.expandedNodes.add(node.id);
    } else {
      this.expandedNodes.delete(node.id);
    }

    this.filteredNodes = this.flattenTree(this.treeNodes);
    this.expandChange.emit(node);
  }

  // Node selection
  onNodeClick(node: TreeNode, event: Event) {
    event.stopPropagation();

    if (this.effectiveConfig.selectable) {
      if (this.effectiveConfig.multiSelect && this.effectiveConfig.showCheckboxes) {
        // Handle checkbox selection
        this.toggleNodeSelection(node);
      } else {
        // Handle single selection
        this.selectedNodes = [node];
        node.selected = true;
        // Deselect other nodes
        this.deselectOtherNodes(node);
      }
      
      this.selectionChange.emit(this.selectedNodes.map(n => n.data));
    }

    this.nodeClick.emit(node.data);
  }

  // Checkbox selection logic
  toggleNodeSelection(node: TreeNode) {
    node.selected = !node.selected;
    node.indeterminate = false;

    // Update selection state
    if (node.selected) {
      this.selectedNodes.push(node);
    } else {
      this.selectedNodes = this.selectedNodes.filter(n => n.id !== node.id);
    }

    // Update parent/child states
    this.updateParentSelection(node);
    this.updateChildrenSelection(node, node.selected);
  }

  // Update parent selection state (for checkboxes)
  private updateParentSelection(node: TreeNode) {
    // Implementation for updating parent checkbox states
    // This would traverse up the tree and set indeterminate/selected states
  }

  // Update children selection state
  private updateChildrenSelection(node: TreeNode, selected: boolean) {
    if (node.children) {
      node.children.forEach(child => {
        child.selected = selected;
        child.indeterminate = false;
        
        if (selected) {
          if (!this.selectedNodes.find(n => n.id === child.id)) {
            this.selectedNodes.push(child);
          }
        } else {
          this.selectedNodes = this.selectedNodes.filter(n => n.id !== child.id);
        }
        
        this.updateChildrenSelection(child, selected);
      });
    }
  }

  // Deselect all nodes except the specified one
  private deselectOtherNodes(selectedNode: TreeNode) {
    const deselect = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        if (node.id !== selectedNode.id) {
          node.selected = false;
          node.indeterminate = false;
        }
        if (node.children) {
          deselect(node.children);
        }
      });
    };
    deselect(this.treeNodes);
  }

  // Search/filter functionality
  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applySearchFilter();
  }

  private applySearchFilter() {
    if (!this.searchTerm) {
      this.filteredNodes = this.flattenTree(this.treeNodes);
      return;
    }

    const searchLower = this.searchTerm.toLowerCase();
    const filtered: TreeNode[] = [];

    const searchNodes = (nodes: TreeNode[]): boolean => {
      let hasMatch = false;
      
      nodes.forEach(node => {
        let nodeMatches = false;
        
        // Check if node data matches search
        const nodeData = node.data;
        for (const key in nodeData) {
          if (String(nodeData[key]).toLowerCase().includes(searchLower)) {
            nodeMatches = true;
            break;
          }
        }

        // Check children
        let childrenMatch = false;
        if (node.children) {
          childrenMatch = searchNodes(node.children);
        }

        // If node or children match, include it and expand
        if (nodeMatches || childrenMatch) {
          node.expanded = true;
          this.expandedNodes.add(node.id);
          filtered.push(node);
          hasMatch = true;
        }
      });

      return hasMatch;
    };

    searchNodes(this.treeNodes);
    this.filteredNodes = filtered;
  }

  // Action handlers
  onAction(action: TreeTableAction, node?: TreeNode) {
    const data = node ? [node.data] : this.selectedNodes.map(n => n.data);
    
    if (action.confirm) {
      if (confirm(action.confirm.message)) {
        action.handler(data);
      }
    } else {
      action.handler(data);
    }
    
    this.action.emit({ actionId: action.id, data });
  }

  // Get indent style for tree levels
  getIndentStyle(level: number): any {
    return {
      'margin-left': `${level * this.effectiveConfig.indentSize}px`
    };
  }

  // Format cell value based on column type
  formatCellValue(column: TreeTableColumn, value: any, node: TreeNode): string {
    if (column.formatter) {
      return column.formatter(value, node);
    }

    switch (column.type) {
      case 'currency':
        return this.formatCurrency(value);
      case 'date':
        return this.formatDate(value);
      case 'boolean':
        return value ? 'Yes' : 'No';
      default:
        return String(value || '');
    }
  }

  private formatCurrency(value: any): string {
    if (value == null) return '';
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(numValue);
  }

  private formatDate(value: any): string {
    if (!value) return '';
    const date = new Date(value);
    return isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
  }
}