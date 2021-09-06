import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-category-document',
  templateUrl: './list-category-document.component.html',
  styleUrls: ['./list-category-document.component.css'],
})
export class ListCategoryDocumentComponent implements OnInit {
  /* Start Variables */
  @Input() categoryDocumentsData: ICategoryDoc[] = [];
  @Output() createEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.categoryDocumentsData.length,
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  /* End Variables */
  constructor() {}

  ngOnInit(): void {}

  /**
   * onTableSizeChange
   * * For change size Pagination per page
   */
  onTableSizeChange(event: any): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }

  create(): void {
    this.createEvent.emit(true);
  }

  edit(categoryDocuments: ICategoryDoc): void {
    this.editEvent.emit(categoryDocuments);
  }

  delete(categoryDocuments: ICategoryDoc): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        this.deleteEvent.emit(categoryDocuments);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }
}
