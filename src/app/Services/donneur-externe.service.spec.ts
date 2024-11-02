import { TestBed } from '@angular/core/testing';

import { DonneurExterneService } from './donneur-externe.service';

describe('DonneurExterneService', () => {
  let service: DonneurExterneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonneurExterneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
