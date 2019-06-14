import { INavLink } from './models';

export class Constants {
  static appNavLinks: INavLink[] = [
    { name: 'Products', link: '/products' }
  ];

  static collections = {
    categoriesCollection: 'categories',
    productsCollection: 'products'
  }

}
