import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerConsultFilesComponent } from './components/container-consult-files/container-consult-files.component';

const routes: Routes = [
  { path: '', component: ContainerConsultFilesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConsultFilesRoutingModule {}
