import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphiqueSexeComponent } from './graphique-sexe.component';

describe('GraphiqueSexeComponent', () => {
  let component: GraphiqueSexeComponent;
  let fixture: ComponentFixture<GraphiqueSexeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphiqueSexeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphiqueSexeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
