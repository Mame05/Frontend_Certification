import { TestBed } from '@angular/core/testing';

import { BanqueSangService } from './banque-sang.service';

describe('BanqueSangService', () => {
  let service: BanqueSangService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanqueSangService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
