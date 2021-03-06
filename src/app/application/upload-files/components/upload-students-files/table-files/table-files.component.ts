import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { ISousCategoryDoc } from 'src/app/_core/models/i-sous-category-doc';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-files',
  templateUrl: './table-files.component.html',
  styleUrls: ['./table-files.component.css'],
})
export class TableFilesComponent implements OnInit {
  @Input() filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  // @Input() categoryDocumentsData : ICategoryDoc []=[];
  @Input() sousCategoryDocumentsData: ISousCategoryDoc[] = [];

  @Output() studentFilesTableEvent = new EventEmitter();
  listFileRequest: FormArray = new FormArray([]);

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems:
      this.filesStudentUploadedFromGroup?.value?.listFileRequest?.length,
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filesStudentUploadedFromGroup']) {
      console.log(this.filesStudentUploadedFromGroup.value);
    }
    if (changes['sousCategoryDocumentsData']) {
      console.log(this.sousCategoryDocumentsData);
    }
  }

  deleteFile(index: number) {
    Swal.fire({
      title: 'Tu es sure?',
      text: 'Vous ne pourrez pas récupérer ce document',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui!',
      cancelButtonText: 'Non',
    }).then((result) => {
      if (result.value) {
        this.studentFileControl.controls.splice(index, 1);
        this.studentFileControl.value.splice(index, 1);
        this.studentFilesTableEvent.emit(this.studentFileControl.value);
      }
    });
  }

  /**
   * fieldGlobalIndex
   * * To fix pagination with formArray
   */
  fieldGlobalIndex(index: number) {
    return this.config.itemsPerPage * (this.config.currentPage - 1) + index;
  }

  get studentFileControl(): FormArray {
    return this.filesStudentUploadedFromGroup.get(
      'listFileRequest'
    ) as FormArray;
  }
}
