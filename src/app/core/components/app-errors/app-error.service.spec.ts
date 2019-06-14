import { TestBed } from '@angular/core/testing';

import { AppErrorService } from './app-error.service';

describe('AppErrorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppErrorService = TestBed.get(AppErrorService);
    expect(service).toBeTruthy();
  });
});
