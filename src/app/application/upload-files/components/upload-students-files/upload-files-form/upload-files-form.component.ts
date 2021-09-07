import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryDocumentService } from 'src/app/application/category-document/services/category-document.service';
import { IEtudiant } from 'src/app/_core/models/i-etudiant';
import { IFile } from 'src/app/_core/models/i-file';
import { IInscription } from 'src/app/_core/models/i-inscription';
import { EtudiantService } from 'src/app/_core/services/etudiant-service';
import { FileUploadService } from 'src/app/_core/services/file-upload.service';

@Component({
  selector: 'app-upload-files-form',
  templateUrl: './upload-files-form.component.html',
  styleUrls: ['./upload-files-form.component.css'],
})
export class UploadFilesFormComponent implements OnInit {
  @Input() filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  @Output() filesStudentUploadedEven = new EventEmitter();

  dataInscription: IInscription[]= [];
  dataEtudiant : IEtudiant[] = [];

  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
    private categoryDocumentService : CategoryDocumentService,
    private etudiantService : EtudiantService

    
  ) {}

  ngOnInit(): void {
   this.etudiantService.getAnneeInscriptionData().subscribe((res: IInscription[]) => {
      this.dataInscription = res;

    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filesStudentUploadedFromGroup']) {
    }
  }

  uploadFiles(event: any) {
  const arrayOfBase64: Promise<IFile[]> =
   this.fileUploadService.fileListToBase64(event.target.files);
    arrayOfBase64.then((res: IFile[]) => {
     console.log('res', res);
      res.forEach((element) => {
        this.studentFileControl.push(
          this.createItem({
            fileName: element.fileName,
            fileBase64: element.fileBase64, //Base64 string for preview image
            typeDocument : "",
            libelleComplementaire : "" ,
          })
        );
      });
      this.filesStudentUploadedEventEmitter();
    });
    event.target.value = null;
  }

  getlistEtudiantByInscriptiondate(){

    console.log('etudiant')

    var etudiant : any
    etudiant = this.dataInscription.find(insc => insc.id === 
      this.filesStudentUploadedFromGroup.controls.AnneeScolaire.value
      )?.etudiant;
      console.log(etudiant)
    this.dataEtudiant.push(etudiant)
    
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

  get AnneeScolaireControl(){
    return this.filesStudentUploadedFromGroup.get('AnneeScolaire') ;
  }
  
  /**
   *   emit changes to parent component
   */

  filesStudentUploadedEventEmitter() {
    this.filesStudentUploadedEven.emit(this.studentFileControl);
  }
}
