import { TestBed } from '@angular/core/testing';

import { DiscusslyService } from './discussly-service';

describe('DiscusslyService', () => {
  let service: DiscusslyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscusslyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
