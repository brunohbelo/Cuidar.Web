import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyAttendanceHistoryComponent } from './family-attendance-history.component';

describe('FamilyAttendanceHistoryComponent', () => {
  let component: FamilyAttendanceHistoryComponent;
  let fixture: ComponentFixture<FamilyAttendanceHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyAttendanceHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyAttendanceHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
