import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerCategoryDocumentComponent } from './components/container-category-document/container-category-document.component';
import { ListCategoryDocumentComponent } from './components/list-category-document/list-category-document.component';
import { FormAddEditCategoryDocumentComponent } from './components/form-add-edit-category-document/form-add-edit-category-document.component';



@NgModule({
  declarations: [
    ContainerCategoryDocumentComponent,
    ListCategoryDocumentComponent,
    FormAddEditCategoryDocumentComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CategoryDocumentModule { }
