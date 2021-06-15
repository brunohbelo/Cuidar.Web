import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyActionPlanComponent } from './family-action-plan.component';

describe('FamilyActionPlanComponent', () => {
  let component: FamilyActionPlanComponent;
  let fixture: ComponentFixture<FamilyActionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyActionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyActionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
