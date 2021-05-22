import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyApprovalReviewComponent } from './family-approval-review.component';

describe('FamilyApprovalReviewComponent', () => {
  let component: FamilyApprovalReviewComponent;
  let fixture: ComponentFixture<FamilyApprovalReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyApprovalReviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyApprovalReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
