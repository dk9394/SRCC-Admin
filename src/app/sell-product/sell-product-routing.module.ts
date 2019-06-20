import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellProductLandingComponent } from './sell-product-landing/sell-product-landing.component';
import { ShopProductComponent } from './shop-product/shop-product.component';
import { ThirdPartyProductComponent } from './third-party-product/third-party-product.component';
import { AuthGuard } from '../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '', component: SellProductLandingComponent, canLoad: [AuthGuard],
    children: [
      { path: 'sp', component: ShopProductComponent },
      { path: 'tpp', component: ThirdPartyProductComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellProductRoutingModule { }
