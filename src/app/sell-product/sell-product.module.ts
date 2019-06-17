import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellProductRoutingModule } from './sell-product-routing.module';
import { SellProductLandingComponent } from './sell-product-landing/sell-product-landing.component';

@NgModule({
  declarations: [SellProductLandingComponent],
  imports: [
    CommonModule,
    SellProductRoutingModule
  ]
})
export class SellProductModule { }
