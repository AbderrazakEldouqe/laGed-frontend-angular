import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-table-files',
  templateUrl: './table-files.component.html',
  styleUrls: ['./table-files.component.css'],
})
export class TableFilesComponent implements OnInit {
  @Input() studentFilesTable: any[] = [];
  @Output() studentFilesTableEvent = new EventEmitter()


  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentFilesTable']) {
      console.log(this.studentFilesTable);
    }
  }
  deleteFile(i: number) {
    console.log('files Deleted');
    this.studentFilesTable.splice(i, 1);
    this.studentFilesTableEvent.emit(this.studentFilesTable)
  }
}
