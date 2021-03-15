import { TestBed } from '@angular/core/testing';

import { GetEditInfoService } from './get-edit-info.service';

describe('GetEditInfoService', () => {
  let service: GetEditInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEditInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
