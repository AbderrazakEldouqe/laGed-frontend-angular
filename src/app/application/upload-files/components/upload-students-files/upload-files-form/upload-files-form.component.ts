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
import { FileUploadService } from 'src/app/_core/services/file-upload.service';

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
  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filesStudentUploadedFromGroup']) {
      console.log('Efteer Deleet');
      console.log(this.filesStudentUploadedFromGroup?.value);
      console.log(this.filesStudentUploadedFromGroup);
    }
  }

  uploadFiles(event: any) {
    /*let files = event.target.files;
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
    }*/
  const arrayOfBase64: Promise<IFile[]> =
   this.fileUploadService.fileListToBase64(event.target.files);
    arrayOfBase64.then((res: IFile[]) => {
     console.log('res', res);
      res.forEach((element) => {
        this.studentFileControl.push(
          this.createItem({
            fileName: element.fileName,
            fileBase64: element.fileBase64, //Base64 string for preview image
          })
        );
      });
      this.filesStudentUploadedEventEmitter();
    });
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
  
  /**
   *   emit changes to parent component
   */

  filesStudentUploadedEventEmitter() {
    this.filesStudentUploadedEven.emit(this.studentFileControl);
  }
}
