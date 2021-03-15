import { TestBed } from '@angular/core/testing';

import { PrimaryPhoneAsyncValidatorService } from './primary-phone-validator.service';

describe('PrimaryPhoneAsyncValidatorService', () => {
  let service: PrimaryPhoneAsyncValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrimaryPhoneAsyncValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
