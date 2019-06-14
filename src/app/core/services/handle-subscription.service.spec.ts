import { TestBed } from '@angular/core/testing';

import { HandleSubscriptionService } from './handle-subscription.service';

describe('HandleSubscriptionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HandleSubscriptionService = TestBed.get(HandleSubscriptionService);
    expect(service).toBeTruthy();
  });
});
