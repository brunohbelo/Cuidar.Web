import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyActionPlanItemComponent } from './family-action-plan-item.component';

describe('FamilyActionPlanItemComponent', () => {
  let component: FamilyActionPlanItemComponent;
  let fixture: ComponentFixture<FamilyActionPlanItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyActionPlanItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyActionPlanItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
