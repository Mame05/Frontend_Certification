import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAnnonceUserComponent } from './detail-annonce-user.component';

describe('DetailAnnonceUserComponent', () => {
  let component: DetailAnnonceUserComponent;
  let fixture: ComponentFixture<DetailAnnonceUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAnnonceUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailAnnonceUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
