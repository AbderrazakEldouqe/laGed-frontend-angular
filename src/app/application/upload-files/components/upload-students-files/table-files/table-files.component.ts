import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-table-files',
  templateUrl: './table-files.component.html',
  styleUrls: ['./table-files.component.css'],
})
export class TableFilesComponent implements OnInit {
  @Input() studentFilesFrom: FormArray = new FormArray([]);
  @Output() studentFilesTableEvent = new EventEmitter();

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.studentFilesFrom.value .length,
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';
  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentFilesFrom']) {
      console.log(this.studentFilesFrom);
    }
  }
  deleteFile(index: number) {
    console.log('files Deleted');
    this.studentFilesFrom.removeAt(index);
    this.studentFilesTableEvent.emit(this.studentFilesFrom);
  }
}
