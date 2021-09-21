import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEtudiant } from 'src/app/_core/models/i-etudiant';
import { IFile } from 'src/app/_core/models/i-file';
import { IInscription } from 'src/app/_core/models/i-inscription';
import { FileUploadService } from 'src/app/_core/services/file-upload.service';

@Component({
  selector: 'app-upload-files-form',
  templateUrl: './upload-files-form.component.html',
  styleUrls: ['./upload-files-form.component.css'],
})
export class UploadFilesFormComponent implements OnInit {
  @Input() filesStudentUploadedFromGroup: FormGroup = new FormGroup({});
  @Input() listAnneeScolaire: string[] = [];
  @Input() listStudentByAnneeScolaire : IEtudiant[]=[];


  @Output() listAnneeScolaireSelectedEven = new EventEmitter();
  @Output() filesStudentUploadedEven = new EventEmitter();

  dataInscription: IInscription[]= [];
  dataEtudiant : IEtudiant[] = [];


  constructor(
    private fb: FormBuilder,
    private fileUploadService: FileUploadService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filesStudentUploadedFromGroup']) {
    }
    if (changes['listAnneeScolaire']) {
      console.log(this.listAnneeScolaire)
    }
    if (changes['listStudentByAnneeScolaire']) {
      console.log(this.listStudentByAnneeScolaire)
    }

  }

  uploadFiles(event: any) {
  const arrayOfBase64: Promise<IFile[]> =
   this.fileUploadService.fileListToBase64(event.target.files);
    arrayOfBase64.then((res: IFile[]) => {
      res.forEach((element) => {
        this.studentFileControl.push(
          this.createItem({
            fileName: element.fileName,
            filebase64: element.filebase64, //Base64 string for preview image
            sousCategorieDTO: undefined,
            libelleComplementaire : undefined ,
          })
        );
      });
      this.filesStudentUploadedEventEmitter();
    });
    event.target.value = null;
  }

  getlistEtudiantByInscriptiondate(){
    if(this.AnneeScolaireControl?.value)   {
      this.studentCodeControl?.enable()
      this.listAnneeScolaireSelectedEven.emit(this.AnneeScolaireControl?.value)
    }else{
      this.studentCodeControl?.setValue(null);
      this.studentCodeControl?.disable();
      this.studentCodeControl?.updateValueAndValidity();
    }
  }

  /*
   *  We will create multiple form controls inside defined form controls photos.
   */
  createItem(data: IFile): FormGroup {
    // return this.fb.group(data);
    console.log(data)
    return this.fb.group({
            fileName: [data.fileName, Validators.required],
            filebase64: [data.filebase64,  Validators.required],
            sousCategorieDTO: [null, Validators.required],
            libelleComplementaire: [null ,Validators.required],
          });
  }


  /**
   *   emit changes to parent component
   */

  filesStudentUploadedEventEmitter() {
    this.filesStudentUploadedEven.emit(this.studentFileControl);
  }


    /**
   *   Help to get all student Files controls as form array.
   */
     get studentFileControl(): FormArray {
      return this.filesStudentUploadedFromGroup.get('listFileRequest') as FormArray;
    }
  
   /**
   *   Help to get all Année Scolaire controls as form array.
   */
    get AnneeScolaireControl(){
      return this.filesStudentUploadedFromGroup.get('anneeScolaire') ;
    }

     /**
   *   Help to get all student Code controls as form array.
   */
    get studentCodeControl(){
      return this.filesStudentUploadedFromGroup.get('etudiantDTO') ;
    }
}
