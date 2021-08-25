import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { IFile } from 'src/app/_core/models/i-file';

@Component({
  selector: 'app-upload-files-form',
  templateUrl: './upload-files-form.component.html',
  styleUrls: ['./upload-files-form.component.css'],
})
export class UploadFilesFormComponent implements OnInit {
  @Input() filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  @Output() filesStudentUploadedEven = new EventEmitter();

  CodeEtudiant = [
    { id: 1, code: 'Volvo' },
    { id: 2, code: 'Saab' },
  ];
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filesStudentUploadedFromGroup']) {
      console.log('Efteer Deleet');
      console.log(this.filesStudentUploadedFromGroup?.value);
      console.log(this.filesStudentUploadedFromGroup);
    }
  }

  uploadFiles(event: any) {
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

  /*
   *  We will create multiple form controls inside defined form controls photos.
   */

  createItem(data: IFile): FormGroup {
    return this.fb.group(data);
  }

  /**
   *   Help to get all photos controls as form array.
   */
  get studentFileControl(): FormArray {
    return this.filesStudentUploadedFromGroup.get('studentFiles') as FormArray;
  }

  filesStudentUploadedEventEmitter() {
    this.filesStudentUploadedEven.emit(this.studentFileControl);
  }
}
