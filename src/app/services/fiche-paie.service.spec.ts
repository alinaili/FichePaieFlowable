import { TestBed } from '@angular/core/testing';

import { FichePaieService } from './fiche-paie.service';

describe('FichePaieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FichePaieService = TestBed.get(FichePaieService);
    expect(service).toBeTruthy();
  });
});
