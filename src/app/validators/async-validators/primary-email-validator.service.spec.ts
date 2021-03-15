import { TestBed } from '@angular/core/testing';

import { PrimaryEmailAsyncValidatorService } from './primary-email-validator.service';

describe('PrimaryEmailAsyncValidatorService', () => {
  let service: PrimaryEmailAsyncValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryEmailAsyncValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
