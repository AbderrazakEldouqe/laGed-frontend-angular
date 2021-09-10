import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { IEtudiant } from 'src/app/_core/models/i-etudiant';
import { EtudiantService } from 'src/app/_core/services/etudiant-service';
import { NotificationService } from 'src/app/_core/services/notification.service';
import { ReactiveFormsService } from 'src/app/_core/services/reactive-forms.service';
import { SubSink } from 'subsink';
import { UploadStudentFileService } from '../../service/uploadFiles.service';

@Component({
  selector: 'app-upload-students-files',
  templateUrl: './upload-students-files.component.html',
  styleUrls: ['./upload-students-files.component.css'],
})
export class UploadStudentsFilesComponent implements OnInit {
  showTableFilesOrIconBolean: boolean = false;
  filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  filesUploadedFromGroup: FormGroup = new FormGroup({});
  listAnneeScolaire: string[] = [];
  listStudentByAnneeScolaire: IEtudiant[] = [];

  private subs = new SubSink();
  categoryDocumentsData: ICategoryDoc[] = [];

  constructor(
    private fb: FormBuilder,
    private categoryDocumentService: CategoryDocumentService,
    private etudiantService: EtudiantService,
    private reactiveFormsService: ReactiveFormsService,
    private notification: NotificationService,
    private uploadStudentFileService: UploadStudentFileService,
    private router: Router,

  ) {}

  ngOnInit(): void {
    this.createFromUpload();
    this.getAllAnneeScolaire();
    this.getAllCategoryDocuments();
  }

  createFromUpload() {
    this.filesStudentUploadedFromGroup = this.fb.group({
      anneeScolaire: [null, Validators.required],
      etudiantDTO: [{ value: null, disabled: true }, [Validators.required]],
      listFileRequest: this.fb.array([]),
    });
  }

  uploadNow() {
    console.log('send Files To Back-End');
    if (this.filesStudentUploadedFromGroup.valid) {
      if (this.studentFileControl.length > 0) {
        console.log('this Form is valid');
        this.uploadStudentFileService
          .uploadFilesStudent(this.filesStudentUploadedFromGroup.value)
          .subscribe((res) => {
            console.log(res);
            this.notification.success(`documents has been saved`, 'Success');
            this.router.navigateByUrl('/application/consult-files')
          });
      } else {
        console.log('add Files ');
        this.notification.error(`No Files Added`, 'Add Files!');

      }
    } else {
      this.reactiveFormsService.validateAllFormFields(
        this.filesStudentUploadedFromGroup
      );
    }
  }

  filesStudentUploadedEventEmitter(event: any) {
    if (event.length > 0) {
      this.showTableFilesOrIconBolean = true;
    } else {
      this.showTableFilesOrIconBolean = false;
    }
  }

  /**
   *   Help to get all student Files controls as form array.
   */
  get studentFileControl(): FormArray {
    return this.filesStudentUploadedFromGroup.get(
      'listFileRequest'
    ) as FormArray;
  }

  getAllAnneeScolaire() {
    this.etudiantService.getAnneeScolaire().subscribe((res) => {
      console.log(res);
      this.listAnneeScolaire = res;
    });
  }

  getAllStudentByAnneeScolaire(event: any) {
    this.etudiantService
      .getAllStudentByAnneeScolaire(event)
      .subscribe((res) => {
        this.listStudentByAnneeScolaire = res;
      });
  }

  /**
   * getAllCategoryDocuments
   * * It is called for get data From Backend
   */
  getAllCategoryDocuments(): void {
    this.subs.add(
      this.categoryDocumentService.getAll().subscribe((res: ICategoryDoc[]) => {
        this.categoryDocumentsData = res;
      })
    );
  }
}
