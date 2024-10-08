import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebare1Component } from './sidebare1.component';

describe('Sidebare1Component', () => {
  let component: Sidebare1Component;
  let fixture: ComponentFixture<Sidebare1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidebare1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Sidebare1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
