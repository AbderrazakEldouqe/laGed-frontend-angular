import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SousCategoryDocumentRoutingModule } from './sous-category-document-routing.module';
import { ContainerSousCategoryDocumentComponent } from './components/container-sous-category-document/container-sous-category-document.component';
import { FormAddEditSousCategoryDocumentComponent } from './components/form-add-edit-sous-category-document/form-add-edit-sous-category-document.component';
import { ListSousCategoryDocumentComponent } from './components/list-sous-category-document/list-sous-category-document.component';
import { SharedModule } from 'src/app/_shared/shared.module';


@NgModule({
  declarations: [
    ContainerSousCategoryDocumentComponent,
    FormAddEditSousCategoryDocumentComponent,
    ListSousCategoryDocumentComponent
  ],
  imports: [
    CommonModule,
    SousCategoryDocumentRoutingModule,
    SharedModule
  ]
})
export class SousCategoryDocumentModule { }
