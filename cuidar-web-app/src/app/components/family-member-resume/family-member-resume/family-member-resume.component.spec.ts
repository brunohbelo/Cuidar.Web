import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMemberResumeComponent } from './family-member-resume.component';

describe('FamilyMemberResumeComponent', () => {
  let component: FamilyMemberResumeComponent;
  let fixture: ComponentFixture<FamilyMemberResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyMemberResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMemberResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
