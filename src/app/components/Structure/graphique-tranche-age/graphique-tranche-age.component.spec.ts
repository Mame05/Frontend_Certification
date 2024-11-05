import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueTrancheAgeComponent } from './graphique-tranche-age.component';

describe('GraphiqueTrancheAgeComponent', () => {
  let component: GraphiqueTrancheAgeComponent;
  let fixture: ComponentFixture<GraphiqueTrancheAgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueTrancheAgeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphiqueTrancheAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
