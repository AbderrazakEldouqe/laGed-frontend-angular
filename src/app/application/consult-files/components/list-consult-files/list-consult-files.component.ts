import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { IEtudiantDoc } from 'src/app/_core/models/i-etudiant-doc';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-consult-files',
  templateUrl: './list-consult-files.component.html',
  styleUrls: ['./list-consult-files.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListConsultFilesComponent implements OnInit {
  /* Start Variables */
  @Input() filesData: any[] = [];

  @Output() downloadEvent = new EventEmitter();

  @Output() editEvent = new EventEmitter();

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.filesData.length,
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
  download(data: any) {
    this.downloadEvent.emit(data);
  }

  annuler(data: any) {
    //this.downloadEvent.emit(data);
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, cancel it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.value) {
        //this.deleteEvent.emit(categoryDocuments);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
      }
    });
  }

  edit(etudiantDocument: IEtudiantDoc): void {
    this.editEvent.emit(etudiantDocument);
  }
}
