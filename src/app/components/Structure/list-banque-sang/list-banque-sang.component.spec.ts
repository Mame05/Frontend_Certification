import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBanqueSangComponent } from './list-banque-sang.component';

describe('ListBanqueSangComponent', () => {
  let component: ListBanqueSangComponent;
  let fixture: ComponentFixture<ListBanqueSangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBanqueSangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBanqueSangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
