import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanqueSangFormComponent } from './banque-sang-form.component';

describe('BanqueSangFormComponent', () => {
  let component: BanqueSangFormComponent;
  let fixture: ComponentFixture<BanqueSangFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanqueSangFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BanqueSangFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
