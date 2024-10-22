import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PocheSangFormComponent } from './poche-sang-form.component';

describe('PocheSangFormComponent', () => {
  let component: PocheSangFormComponent;
  let fixture: ComponentFixture<PocheSangFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PocheSangFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PocheSangFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
