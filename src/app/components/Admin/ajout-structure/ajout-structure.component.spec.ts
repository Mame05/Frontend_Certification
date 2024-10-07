import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutStructureComponent } from './ajout-structure.component';

describe('AjoutStructureComponent', () => {
  let component: AjoutStructureComponent;
  let fixture: ComponentFixture<AjoutStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AjoutStructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AjoutStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
