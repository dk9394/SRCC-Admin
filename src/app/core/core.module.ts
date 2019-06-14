import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MainHeaderComponent } from './components/main-header/main-header.component';
import { AppErrorsComponent } from './components/app-errors/app-errors.component';
import { PageSpinnerComponent } from './components/page-spinner/page-spinner.component';
import { PageScrollDirective } from './directives/page-scroll.directive';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
  declarations: [
    MainHeaderComponent,
    AppErrorsComponent,
    PageSpinnerComponent,
    PageScrollDirective,
    LogoComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    MainHeaderComponent,
    AppErrorsComponent,
    PageSpinnerComponent
  ]
})
export class CoreModule { }
