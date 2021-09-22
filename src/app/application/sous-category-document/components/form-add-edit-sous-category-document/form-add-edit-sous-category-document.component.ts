import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';
import { ISousCategoryDoc } from 'src/app/_core/models/i-sous-category-doc';

@Component({
  selector: 'app-form-add-edit-sous-category-document',
  templateUrl: './form-add-edit-sous-category-document.component.html',
  styleUrls: ['./form-add-edit-sous-category-document.component.css']
})
export class FormAddEditSousCategoryDocumentComponent implements OnInit {

  @Input() selectedSousCategoryDocument: ISousCategoryDoc | null = null;
  @Input () categoryDocumentsData: ICategoryDoc[] = [];

  @Output() backToListEvent = new EventEmitter();
  @Output() storeEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();

  form!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      categorieDTO : new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.required]),
      libelle: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    console.log('ss');
    if (this.selectedSousCategoryDocument) {
      this.update();
    } else {
      console.log('ss1');
      this.store();
    }
  }

  store(): void {
    this.storeEvent.emit(this.form.value);
    this.form.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectedSousCategoryDocument) {
      this.form.patchValue({
        categorieDTO : this.selectedSousCategoryDocument.categorieDTO,
        description: this.selectedSousCategoryDocument.description,
        libelle: this.selectedSousCategoryDocument.libelle,
      });
    }

    if (this.selectedSousCategoryDocument) {
  
    }
    if (this.selectedSousCategoryDocument) {
      
    }
  }

  update(): void {
    let updatedsousCategory: any = this.form.value;
    console.log(this.form.value);
    updatedsousCategory['idSousCategorie'] = this.selectedSousCategoryDocument?.idSousCategorie;
    this.updateEvent.emit(updatedsousCategory);
    this.form.reset();
    this.selectedSousCategoryDocument = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }


  comparewith(item : any , selected : any){
    return  item.idCategorie === selected.idCategorie;
  }
  

}
