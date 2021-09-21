import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddEditSousCategoryDocumentComponent } from './form-add-edit-sous-category-document.component';

describe('FormAddEditSousCategoryDocumentComponent', () => {
  let component: FormAddEditSousCategoryDocumentComponent;
  let fixture: ComponentFixture<FormAddEditSousCategoryDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAddEditSousCategoryDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAddEditSousCategoryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
