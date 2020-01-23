import { TestBed } from '@angular/core/testing';

import { DafService } from './daf.service';

describe('DafService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DafService = TestBed.get(DafService);
    expect(service).toBeTruthy();
  });
});
