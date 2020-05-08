import { TestBed, async, inject } from '@angular/core/testing';

import { ChangepasswordGuard } from './changepassword.guard';

describe('ChangepasswordGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangepasswordGuard]
    });
  });

  it('should ...', inject([ChangepasswordGuard], (guard: ChangepasswordGuard) => {
    expect(guard).toBeTruthy();
  }));
});
