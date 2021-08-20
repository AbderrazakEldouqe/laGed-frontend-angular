import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-students-files',
  templateUrl: './upload-students-files.component.html',
  styleUrls: ['./upload-students-files.component.css'],
})
export class UploadStudentsFilesComponent implements OnInit {
  showTableFilesOrIconBolean: boolean = false;
  studentFilesTable: any[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  showTableFilesOrIcon() {}

  uploadNow() {
    ('send Files To Back-End');
  }

  filesStudentUploadedEventEmitter(event: any) {
    console.log(event);
    if (event.length > 0) {
      this.showTableFilesOrIconBolean = true;
      this.studentFilesTable = event;
    } else {
      this.showTableFilesOrIconBolean = false;
    }
  }
}
