import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategoryDoc } from 'src/app/_core/models/i-category-doc';

@Component({
  selector: 'app-form-add-edit-category-document',
  templateUrl: './form-add-edit-category-document.component.html',
  styleUrls: ['./form-add-edit-category-document.component.css'],
})
export class FormAddEditCategoryDocumentComponent implements OnInit {
  @Output() storeEvent = new EventEmitter();
  @Output() updateEvent = new EventEmitter();
  @Input() categoryDocument: ICategoryDoc | null = null;
  form!: FormGroup;
  @Output() backToListEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      catDoc: new FormControl(null, [Validators.required]),
      libelle: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    console.log('ss');
    if (this.categoryDocument) {
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
    if (this.categoryDocument) {
      this.form.patchValue({
        catDoc: this.categoryDocument.catDoc,
        libelle: this.categoryDocument.libelle,
      });
    }
  }

  update(): void {
    let updatedCategory: any = this.form.value;
    console.log(this.form.value);
    updatedCategory['idCategorie'] = this.categoryDocument?.idCategorie;
    this.updateEvent.emit(updatedCategory);
    this.form.reset();
    this.categoryDocument = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }
}
