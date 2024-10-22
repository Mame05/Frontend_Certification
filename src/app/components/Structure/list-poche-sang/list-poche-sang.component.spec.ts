import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPocheSangComponent } from './list-poche-sang.component';

describe('ListPocheSangComponent', () => {
  let component: ListPocheSangComponent;
  let fixture: ComponentFixture<ListPocheSangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListPocheSangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListPocheSangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
