import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPocheSangComponent } from './detail-poche-sang.component';

describe('DetailPocheSangComponent', () => {
  let component: DetailPocheSangComponent;
  let fixture: ComponentFixture<DetailPocheSangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPocheSangComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailPocheSangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
