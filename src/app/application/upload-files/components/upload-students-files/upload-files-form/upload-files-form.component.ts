import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-upload-files-form',
  templateUrl: './upload-files-form.component.html',
  styleUrls: ['./upload-files-form.component.css'],
})
export class UploadFilesFormComponent implements OnInit {
  filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  @Output() filesStudentUploadedEven = new EventEmitter();
  @Input() studentFilesFrom: FormArray = new FormArray([]);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.filesStudentUploadedFromGroup = this.fb.group({
      studentCode: ['', Validators.required],
      studentFiles: this.fb.array([]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['studentFilesFrom']) {
      console.log('Efteer Deleet');
      console.log(this.studentFileControl?.value);
      console.log(this.filesStudentUploadedFromGroup);
    }
  }

  uploadFiles(event: any) {
    console.log(this.filesStudentUploadedFromGroup);

    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.studentFileControl.push(
            this.createItem({
              fileName: file.name,
              fileBase64: e.target.result, //Base64 string for preview image
            })
          );
          this.filesStudentUploadedEventEmitter();
        };
        reader.readAsDataURL(file);
      }
    }
  }

  // We will create multiple form controls inside defined form controls photos.
  createItem(data: any): FormGroup {
    return this.fb.group(data);
  }

  //Help to get all photos controls as form array.
  get studentFileControl(): FormArray {
    return this.filesStudentUploadedFromGroup.get('studentFiles') as FormArray;
  }

  filesStudentUploadedEventEmitter() {
    this.filesStudentUploadedEven.emit(this.studentFileControl);
  }
}
