import { TestBed } from '@angular/core/testing';

import { PocheSangService } from './poche-sang.service';

describe('PocheSangService', () => {
  let service: PocheSangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocheSangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
