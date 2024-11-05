import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueGroupeSanguinComponent } from './graphique-groupe-sanguin.component';

describe('GraphiqueGroupeSanguinComponent', () => {
  let component: GraphiqueGroupeSanguinComponent;
  let fixture: ComponentFixture<GraphiqueGroupeSanguinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueGroupeSanguinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphiqueGroupeSanguinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
