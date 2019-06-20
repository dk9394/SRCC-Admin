import { INavLink, ISellType } from './models';

export class Constants {
  static appNavLinks: INavLink[] = [
    { name: 'Products', link: '/products', active: true },
    { name: 'Sell Product', link: '/sell-product', active: true },
    { name: 'Sales', link: '/sales', active: false }
  ];

  static collections = {
    categoriesCollection: 'categories',
    productsCollection: 'products'
  };

  static sellTypes: ISellType[] = [
    { code: 'sp', name: 'Shop Product', active: true },
    { code: 'tpp', name: 'Third Party Product', active: false }
  ];

}
