import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerConsultFilesComponent } from './components/container-consult-files/container-consult-files.component';
import { ListConsultFilesComponent } from './components/list-consult-files/list-consult-files.component';
import { FormEditConsultFilesComponent } from './components/form-edit-consult-files/form-edit-consult-files.component';
import { FilterSearchConsultFilesComponent } from './components/filter-search-consult-files/filter-search-consult-files.component';
import { ConsultFilesRoutingModule } from './consult-files-routing.module';
import { SharedModule } from 'src/app/_shared/shared.module';

@NgModule({
  declarations: [
    ContainerConsultFilesComponent,
    ListConsultFilesComponent,
    FormEditConsultFilesComponent,
    FilterSearchConsultFilesComponent,
  ],
  imports: [CommonModule, ConsultFilesRoutingModule, SharedModule],
})
export class ConsultFilesModule {}
