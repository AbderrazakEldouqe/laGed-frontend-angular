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
      cat_doc: new FormControl(null, [Validators.required]),
      libelle: new FormControl(null, [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.categoryDocument) {
      this.update();
    } else {
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
        cat_doc: this.categoryDocument.cat_doc,
        libelle: this.categoryDocument.libelle,
      });
    }
  }

  update(): void {
    let updatedTask: any = this.form.value;
    updatedTask['id'] = this.categoryDocument?.id;
    this.updateEvent.emit(updatedTask);
    this.form.reset();
    this.categoryDocument = null;
  }

  back(): void {
    this.form.reset();
    this.backToListEvent.emit();
  }
}
