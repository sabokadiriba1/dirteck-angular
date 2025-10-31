// src/app/shared/data-display/data-table/sub-components/data-table-footer/data-table-footer.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableConfig } from '../models/data-table-config';


@Component({
  selector: 'app-data-table-footer',
  templateUrl: './data-table-footer.component.html',
  standalone: true,
  imports: [CommonModule]
})
export class DataTableFooterComponent {
  @Input() config!: DataTableConfig;
  @Input() currentPage: number = 1;
  @Input() pageSize: number = 25;
  @Input() totalRecords: number = 0;
  @Input() totalPages: number = 0;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endIndex(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalRecords);
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onPageSizeChange(event: Event) {
    const size = +(event.target as HTMLSelectElement).value;
    this.pageSizeChange.emit(size);
  }
}