import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoBackComponent } from './components/go-back/go-back.component';
import { CapitalizeInputDirective } from './directives/capitalize-input.directive';
import { PriceFormatDirective } from './directives/price-format.directive';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    GoBackComponent,
    CapitalizeInputDirective,
    PriceFormatDirective,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoBackComponent,
    CapitalizeInputDirective,
    PriceFormatDirective,
    LoadingComponent
  ]
})
export class SharedModule { }
