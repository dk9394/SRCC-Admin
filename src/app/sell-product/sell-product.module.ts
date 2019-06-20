import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SellProductRoutingModule } from './sell-product-routing.module';
import { SellProductLandingComponent } from './sell-product-landing/sell-product-landing.component';
import { ShopProductComponent } from './shop-product/shop-product.component';
import { ThirdPartyProductComponent } from './third-party-product/third-party-product.component';

@NgModule({
  declarations: [
    SellProductLandingComponent,
    ShopProductComponent,
    ThirdPartyProductComponent
  ],
  imports: [
    CommonModule,
    SellProductRoutingModule,
    ReactiveFormsModule
  ]
})
export class SellProductModule { }
