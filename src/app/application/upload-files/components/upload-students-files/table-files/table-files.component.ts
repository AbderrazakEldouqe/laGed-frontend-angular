import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table-files',
  templateUrl: './table-files.component.html',
  styleUrls: ['./table-files.component.css'],
})
export class TableFilesComponent implements OnInit {
  @Input() filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  @Output() studentFilesTableEvent = new EventEmitter();

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.filesStudentUploadedFromGroup?.value?.studentFiles?.length,
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filesStudentUploadedFromGroup']) {
      console.log(this.filesStudentUploadedFromGroup.value);
    }
  }
  deleteFile(index: number) {
    console.log('files Deleted');
    this.filesStudentUploadedFromGroup.controls.studentFiles.value.splice(
      index,
      1
    );
    console.log(this.filesStudentUploadedFromGroup);
    this.studentFilesTableEvent.emit(
      this.filesStudentUploadedFromGroup.controls.studentFiles.value
    );
  }
}
