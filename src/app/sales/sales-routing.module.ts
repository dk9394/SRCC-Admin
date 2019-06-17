import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalesLandingComponent } from './sales-landing/sales-landing.component';

const routes: Routes = [
  { path: '', component: SalesLandingComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
