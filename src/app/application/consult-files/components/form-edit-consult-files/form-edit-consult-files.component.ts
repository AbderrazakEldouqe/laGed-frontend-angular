import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { IEtudiantDoc } from 'src/app/_core/models/i-etudiant-doc';

@Component({
  selector: 'app-form-edit-consult-files',
  templateUrl: './form-edit-consult-files.component.html',
  styleUrls: ['./form-edit-consult-files.component.css'],
})
export class FormEditConsultFilesComponent implements OnInit, OnChanges {
  @Input() etudiantDocument: IEtudiantDoc | null = null;

  @Input() categoryDocumentsData: ICategoryDoc[] = [];
  @Output() updateEvent = new EventEmitter();

  @Output() backToListEvent = new EventEmitter();

  form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.etudiantDocument) {
      this.form.patchValue({
        idFile: this.etudiantDocument.idDocument,
        categorieDTO: this.etudiantDocument.categorieDTO,
        fileName: this.etudiantDocument.nomDoc,
        filebase64: this.etudiantDocument.fileBase64,
        libelleComplementaire: this.etudiantDocument.libelleCompl,
      });
    }
  }
  initialFormGroupe(): void {
    this.form = new FormGroup({
      idFile: new FormControl(null, [Validators.required]),
      categorieDTO: new FormControl(null, [Validators.required]),
      fileName: new FormControl(null, [Validators.required]),
      filebase64: new FormControl(null, [Validators.required]),
      libelleComplementaire: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    console.log('ss');
    this.updateEvent.emit(this.form.value);
    this.form.reset();
    this.etudiantDocument = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }

  compareCategory(c1: ICategoryDoc, c2: ICategoryDoc): boolean {
    console.log(c1.idCategorie + '-' + c2.idCategorie);
    return c1 && c2 ? c1.idCategorie === c2.idCategorie : c1 === c2;
  }
}
