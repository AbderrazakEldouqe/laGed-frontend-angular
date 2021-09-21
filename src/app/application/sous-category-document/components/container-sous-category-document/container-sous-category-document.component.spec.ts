import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerSousCategoryDocumentComponent } from './container-sous-category-document.component';

describe('ContainerSousCategoryDocumentComponent', () => {
  let component: ContainerSousCategoryDocumentComponent;
  let fixture: ComponentFixture<ContainerSousCategoryDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerSousCategoryDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerSousCategoryDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
