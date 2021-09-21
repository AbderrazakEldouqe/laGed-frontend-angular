import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSousCategoryDocumentComponent } from './list-sous-category-document.component';

describe('ListSousCategoryDocumentComponent', () => {
  let component: ListSousCategoryDocumentComponent;
  let fixture: ComponentFixture<ListSousCategoryDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSousCategoryDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSousCategoryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
