import { TestBed } from '@angular/core/testing';

import { AdjudicacionesService } from './adjudicaciones.service';

describe('AdjudicacionesService', () => {
  let service: AdjudicacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdjudicacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
