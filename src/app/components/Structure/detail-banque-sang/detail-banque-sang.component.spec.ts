import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailBanqueSangComponent } from './detail-banque-sang.component';

describe('DetailBanqueSangComponent', () => {
  let component: DetailBanqueSangComponent;
  let fixture: ComponentFixture<DetailBanqueSangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailBanqueSangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailBanqueSangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
