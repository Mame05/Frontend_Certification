import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneurStructureComponent } from './donneur-structure.component';

describe('DonneurStructureComponent', () => {
  let component: DonneurStructureComponent;
  let fixture: ComponentFixture<DonneurStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonneurStructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonneurStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
