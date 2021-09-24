import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ISousCategoryDoc } from 'src/app/_core/models/i-sous-category-doc';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-sous-category-document',
  templateUrl: './list-sous-category-document.component.html',
  styleUrls: ['./list-sous-category-document.component.css'],
})
export class ListSousCategoryDocumentComponent implements OnInit {
  /* Start Variables */
  @Input() sousCategoryDocumentsData: ISousCategoryDoc[] = [];
  @Output() createEvent = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.sousCategoryDocumentsData.length,
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

  edit(sousCategoryDocuments: ISousCategoryDoc): void {
    this.editEvent.emit(sousCategoryDocuments);
  }

  delete(sousCategoryDocuments: ISousCategoryDoc): void {
    Swal.fire({
      title: 'Tu es sure?',
      text: 'Vous ne pourrez pas récupérer ce sous categorie',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui!',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.deleteEvent.emit(sousCategoryDocuments);
      }
    });
  }
}
