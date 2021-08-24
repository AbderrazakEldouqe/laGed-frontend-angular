import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-consult-files',
  templateUrl: './list-consult-files.component.html',
  styleUrls: ['./list-consult-files.component.css'],
})
export class ListConsultFilesComponent implements OnInit {
  @Input() filesData: any[] = [];

  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.filesData.length,
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  constructor() {}

  ngOnInit(): void {}

  onTableSizeChange(event: any): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }
}