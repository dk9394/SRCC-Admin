import { TestBed } from '@angular/core/testing';

import { SellProductService } from './sell-product.service';

describe('SellProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SellProductService = TestBed.get(SellProductService);
    expect(service).toBeTruthy();
  });
});
