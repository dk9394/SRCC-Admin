import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { CategoriesService } from 'src/app/products/categories/categories.service';
import { ICategory } from 'src/app/products/categories/category.model';
import { ProductService } from 'src/app/products/products/product.service';
import { IProduct } from 'src/app/products/products/product.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.scss']
})
export class ShopProductComponent implements OnInit {
  categories: ICategory[] = [];
  products: IProduct[] = [];
  catsSub: Subscription;
  SellProductForm: FormGroup;

  constructor(
    private catService: CategoriesService,
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.SellProductForm = this.formBuilder.group({
      categoryId: this.formBuilder.control(null),
      productId: this.formBuilder.control(null)
    });
    this.catsSub = this.catService.fetchCategories()
      .subscribe((cats: ICategory[]) => {
        this.categories = cats ? cats : [];
      });
  }

  onCategory() {
    this.productService.fetchProducts(this.SellProductForm.get('categoryId').value)
      .subscribe((prods: IProduct[]) => {
        this.products = prods ? prods : [];
        this.SellProductForm.get('productId').setValue(null);
      });
  }

}
