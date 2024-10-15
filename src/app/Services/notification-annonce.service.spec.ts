import { TestBed } from '@angular/core/testing';

import { NotificationAnnonceService } from './notification-annonce.service';

describe('NotificationAnnonceService', () => {
  let service: NotificationAnnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationAnnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
