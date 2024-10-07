import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierStructureComponent } from './modifier-structure.component';

describe('ModifierStructureComponent', () => {
  let component: ModifierStructureComponent;
  let fixture: ComponentFixture<ModifierStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierStructureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModifierStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
