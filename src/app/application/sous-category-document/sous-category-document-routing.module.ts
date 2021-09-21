import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerSousCategoryDocumentComponent } from './components/container-sous-category-document/container-sous-category-document.component';

const routes: Routes = [
  {path : '' , component : ContainerSousCategoryDocumentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SousCategoryDocumentRoutingModule { }
