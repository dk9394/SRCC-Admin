import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';

const routes: Routes = [
  { path: '', component: CategoriesComponent },
  { path: ':categoryId', component: ProductsComponent },
  { path: ':categoryId/new', component: ProductFormComponent, canDeactivate: [CanDeactivateGuard] },
  { path: ':categoryId/:productId', component: ProductComponent },
  { path: ':categoryId/:productId/edit', component: ProductFormComponent, canDeactivate: [CanDeactivateGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
