import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../_shared/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: '/application/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: async () =>
          (await import('./dashboard/dashboard.module')).DashboardModule,
      },
      {
        path: 'upload',
        loadChildren: async () =>
          (await import('./upload-files/upload-files.module'))
            .UploadFilesModule,
      },

      {
        path: 'consult-files',
        loadChildren: async () =>
          (await import('./consult-files/consult-files.module'))
            .ConsultFilesModule,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
