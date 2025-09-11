import { TestBed } from '@angular/core/testing';

import { CordinateService } from './cordinate-service';

describe('CordinateService', () => {
  let service: CordinateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CordinateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
