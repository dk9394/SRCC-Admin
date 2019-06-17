import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../product.service';
import { IProduct } from '../product.model';
import { AppErrorService } from 'src/app/core/components/app-errors/app-error.service';
import { CategoriesService } from '../../categories/categories.service';
import { SpinnerService } from 'src/app/core/components/page-spinner/spinner.service';
import { HandleSubscriptionService } from 'src/app/core/services/handle-subscription.service';
import { AdminService } from 'src/app/core/services/admin.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product: IProduct;
  prodSub: Subscription;
  isLoading: boolean;
  isAdmin: boolean;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private appErrService: AppErrorService,
    private catService: CategoriesService,
    private handleSubscriptions: HandleSubscriptionService,
    private spinner: SpinnerService,
    private router: Router,
    private adminService: AdminService
  ) { }

  ngOnInit() {
    this.isAdmin = this.adminService.admin;
    this.isLoading = true;
    const productId = this.route.snapshot.paramMap.get('productId');
    this.prodSub = this.productService.fetchProduct(this.catService.currentCategory.id, productId)
      .subscribe((product: IProduct) => {
        this.isLoading = false;
        this.product = product;
        this.productService.currentProduct = product;
      }, err => {
        this.appErrService.handleError({ subject: '', message: err.code });
      });
    this.handleSubscriptions.dataSubcriptions.push(this.prodSub);
  }

  onDeleteProduct() {
    if (prompt(`Are you sure, you want to delete ${this.product.name}? Please enter the product name!`) === this.product.name) {
      this.spinner.spinnerStatus.next(true);
      const productName = this.product.name;
      const categoryId = this.route.snapshot.paramMap.get('categoryId');
      this.productService.removeProduct(categoryId, this.product.id)
        .then(res => {
          this.router.navigate(['../'], { relativeTo: this.route });
          this.appErrService.handleSuccess({ subject: productName, message: 'is deleted successfully.' });
        })
        .catch(err => {
          this.appErrService.handleError({ subject: '', message: err.code });
        });
    }
  }

  onEditProduct() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
