import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../_core/guards/auth.guard';
import { RoleGuard } from '../_core/guards/role.guard';
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
        path: 'upload-files',
        loadChildren: async () =>
          (await import('./upload-files/upload-files.module'))
            .UploadFilesModule,
          canActivate: [RoleGuard],

      },

      {
        path: 'consult-files',
        loadChildren: async () =>
          (await import('./consult-files/consult-files.module'))
            .ConsultFilesModule,
            // canActivate: [RoleGuard],

      },
      {
        path: 'category-document',
        loadChildren: async () =>
          (await import('./category-document/category-document.module'))
            .CategoryDocumentModule,
          canActivate: [RoleGuard],

      },
      {
        path: 'sous-category-document',
        loadChildren: async () =>
          (await import('./sous-category-document/sous-category-document.module'))
            .SousCategoryDocumentModule,
          canActivate: [RoleGuard],

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplicationRoutingModule {}
