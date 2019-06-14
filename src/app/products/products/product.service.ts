import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Constants } from './../../core/constants';
import { IProduct } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private categoriesCollection = Constants.collections.categoriesCollection;
  private productsCollection = Constants.collections.productsCollection;
  currentProduct: IProduct;

  constructor(private afs: AngularFirestore) { }

  fetchProducts(categoryId: string) {
    const category = this.afs.collection(this.categoriesCollection).doc(categoryId);
    return category.collection(this.productsCollection).snapshotChanges()
      .pipe(
        map(prods => {
          return prods.map(prod => {
            return {
              id: prod.payload.doc.id,
              ...prod.payload.doc.data()
            };
          });
        })
      );
  }

  fetchProduct(categoryId: string, productId: string) {
    const products = this.afs.collection(this.categoriesCollection).doc(categoryId).collection(this.productsCollection);
    return products.doc(productId).snapshotChanges()
      .pipe(
        map(prodData => {
          return {
            id: prodData.payload.id,
            ...prodData.payload.data()
          };
        })
      );
  }

  removeProduct(categoryId: string, productId: string) {
    const products = this.afs.collection(this.categoriesCollection).doc(categoryId).collection(this.productsCollection);
    return products.doc(productId).delete();
  }

  addProduct(categoryId: string, product: IProduct) {
    this.configureProductData(product);
    return this.afs.collection(this.categoriesCollection).doc(categoryId).collection(this.productsCollection).add(product);
  }

  updateProduct(categoryId: string, productId: string, product: IProduct) {
    this.configureProductData(product);
    return this.afs.collection(this.categoriesCollection).doc(categoryId)
      .collection(this.productsCollection).doc(productId).update(product);
  }

  private configureProductData(product: IProduct) {
    product.warranty = {
      months: +product.warranty.months,
      years: +product.warranty.years
    };
  }
}
