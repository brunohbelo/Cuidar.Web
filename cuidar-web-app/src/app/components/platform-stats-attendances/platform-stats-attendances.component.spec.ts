import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformStatsAttendanceComponent } from './platform-stats-attendances.component';

describe('PlatformStatsFamiliesComponent', () => {
  let component: PlatformStatsAttendanceComponent;
  let fixture: ComponentFixture<PlatformStatsAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformStatsAttendanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformStatsAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
