import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SellProductLandingComponent } from './sell-product-landing/sell-product-landing.component';

const routes: Routes = [
  { path: '', component: SellProductLandingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellProductRoutingModule { }
