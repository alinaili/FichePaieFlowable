import { TestBed } from '@angular/core/testing';

import { MailnodemailService } from './mailnodemail.service';

describe('MailnodemailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MailnodemailService = TestBed.get(MailnodemailService);
    expect(service).toBeTruthy();
  });
});
