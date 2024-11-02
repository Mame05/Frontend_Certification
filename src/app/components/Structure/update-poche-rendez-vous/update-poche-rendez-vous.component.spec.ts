import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePocheRendezVousComponent } from './update-poche-rendez-vous.component';

describe('UpdatePocheRendezVousComponent', () => {
  let component: UpdatePocheRendezVousComponent;
  let fixture: ComponentFixture<UpdatePocheRendezVousComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdatePocheRendezVousComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdatePocheRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
