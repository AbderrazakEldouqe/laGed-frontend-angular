import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LayoutComponent } from './layout/layout.component';
import { KeysPipe } from './pipes/keys.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    PageNotFoundComponent,
    LayoutComponent,
    KeysPipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [ReactiveFormsModule, KeysPipe],
})
export class SharedModule {}
