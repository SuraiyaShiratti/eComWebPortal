import { TestBed } from '@angular/core/testing';

import { EComAPIService } from './ecom-api.service';

describe('EComAPIServiceService', () => {
  let service: EComAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EComAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
