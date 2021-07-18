import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAttendeceComponent } from './family-attendece.component';

describe('FamilyAttendeceComponent', () => {
  let component: FamilyAttendeceComponent;
  let fixture: ComponentFixture<FamilyAttendeceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyAttendeceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAttendeceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
