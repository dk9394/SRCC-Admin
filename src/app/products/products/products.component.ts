import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from './product.service';
import { IProduct } from './product.model';
import { AppErrorService } from 'src/app/core/components/app-errors/app-error.service';
import { ICategory } from '../categories/category.model';
import { CategoriesService } from '../categories/categories.service';
import { HandleSubscriptionService } from 'src/app/core/services/handle-subscription.service';
import { SpinnerService } from 'src/app/core/components/page-spinner/spinner.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: IProduct[];
  category: ICategory;
  isLoading: boolean;
  prodsSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private appErrService: AppErrorService,
    private catService: CategoriesService,
    private handleSubs: HandleSubscriptionService,
    private spinner: SpinnerService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.category = this.catService.currentCategory;
    this.getProducts();
  }

  private getProducts() {
    this.prodsSub = this.productService.fetchProducts(this.category.id)
      .subscribe((prods: IProduct[]) => {
        this.isLoading = false;
        this.products = prods ? prods : [];
      },
        err => {
          this.appErrService.handleError({ subject: '', message: err.code });
        });
    this.handleSubs.dataSubcriptions.push(this.prodsSub);
  }


  onProduct(product: IProduct) {
    this.productService.currentProduct = product;
    this.router.navigate([product.id], { relativeTo: this.route });
  }

  onDeleteCategory() {
    if (this.products.length > 0) {
      this.appErrService.handleError({ subject: this.category.name, message: 'can not be deleted as it contains products.' });
      return;
    }

    if (confirm(`Are you sure, want to delete ${this.category.name}?`)) {
      this.spinner.spinnerStatus.next(true);
      this.catService.removeCategory(this.category.id)
        .then(res => {
          this.router.navigate(['../'], { relativeTo: this.route });
          this.appErrService.handleSuccess({ subject: this.category.name, message: 'is deleted successfully.' });
        })
        .catch(err => {
          this.appErrService.handleError({ subject: '', message: err.code });
        });
    }
  }

  onAddProduct() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
