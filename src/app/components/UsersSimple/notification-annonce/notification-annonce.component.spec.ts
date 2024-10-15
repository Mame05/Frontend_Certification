import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationAnnonceComponent } from './notification-annonce.component';

describe('NotificationAnnonceComponent', () => {
  let component: NotificationAnnonceComponent;
  let fixture: ComponentFixture<NotificationAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationAnnonceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NotificationAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
