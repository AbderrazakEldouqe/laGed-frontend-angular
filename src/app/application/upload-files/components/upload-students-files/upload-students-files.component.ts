import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { SousCategoryDocumentService } from 'src/app/application/sous-category-document/services/sous-category-document.service';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { IEtudiant } from 'src/app/_core/models/i-etudiant';
import { ISousCategoryDoc } from 'src/app/_core/models/i-sous-category-doc';
import { EtudiantService } from 'src/app/_core/services/etudiant.service';
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
  // categoryDocumentsData: ICategoryDoc[] = [];
  sousCategoryDocumentsData: ISousCategoryDoc[] = [];

  constructor(
    private fb: FormBuilder,
    // private categoryDocumentService: CategoryDocumentService,
    private sousCategoryDocumentService: SousCategoryDocumentService,
    private etudiantService: EtudiantService,
    private reactiveFormsService: ReactiveFormsService,
    private notification: NotificationService,
    private uploadStudentFileService: UploadStudentFileService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createFromUpload();
    this.getAllAnneeScolaire();
    this.getAllSousCategoryDocuments();
  }

  createFromUpload() {
    this.filesStudentUploadedFromGroup = this.fb.group({
      anneeScolaire: [null, Validators.required],
      etudiantDTO: [{ value: null, disabled: true }, [Validators.required]],
      listFileRequest: this.fb.array([]),
    });
  }

  uploadNow() {
    console.log('send Files To Back-End', this.filesStudentUploadedFromGroup);
    if (this.studentFileControl.length > 0) {
      if (this.filesStudentUploadedFromGroup.valid) {
        console.log('this Form is valid');
        this.uploadStudentFileService
          .uploadFilesStudent(this.filesStudentUploadedFromGroup.value)
          .subscribe((res) => {
            console.log(res);
            this.notification.success(`Les documents bien uploader`, 'Success');
            this.router.navigateByUrl('/application/consult-files');
          });
      } else {
        this.notification.error(`Veuillez remplir tous les champs`, '');
        this.reactiveFormsService.validateAllFormFields(
          this.filesStudentUploadedFromGroup
        );
      }
    } else {
      console.log('add Files ');
      this.notification.error(`Merci d'ajouté des documents`, '');
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
      console.log('***********', res);
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
  getAllSousCategoryDocuments(): void {
    this.subs.add(
      this.sousCategoryDocumentService
        .getAll()
        .subscribe((res: ISousCategoryDoc[]) => {
          this.sousCategoryDocumentsData = res;
        })
    );
  }
}
