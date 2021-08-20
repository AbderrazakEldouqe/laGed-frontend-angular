import { UploadFilesRoutingModule } from './upload-files-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadStudentsFilesComponent } from './components/upload-students-files/upload-students-files.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { TableFilesComponent } from './components/upload-students-files/table-files/table-files.component';
import { UploadFilesFormComponent } from './components/upload-students-files/upload-files-form/upload-files-form.component';

@NgModule({
  declarations: [UploadStudentsFilesComponent, TableFilesComponent, UploadFilesFormComponent],
  imports: [CommonModule, UploadFilesRoutingModule, SharedModule],
})
export class UploadFilesModule {}
