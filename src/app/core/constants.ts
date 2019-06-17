import { INavLink } from './models';

export class Constants {
  static appNavLinks: INavLink[] = [
    { name: 'Products', link: '/products', active: true },
    { name: 'Sell Product', link: '/sell-product', active: true },
    { name: 'Sales', link: '/sales', active: false }
  ];

  static collections = {
    categoriesCollection: 'categories',
    productsCollection: 'products'
  }

}
