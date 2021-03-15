import { TestBed } from '@angular/core/testing';

import { LoggedInUser } from './logged-in-user';

describe('AuthGuard', () => {
  let guard: LoggedInUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LoggedInUser);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
