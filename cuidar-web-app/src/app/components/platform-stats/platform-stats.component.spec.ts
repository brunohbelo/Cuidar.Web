import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformStatsComponent } from './platform-stats.component';

describe('PlatformStatsComponent', () => {
  let component: PlatformStatsComponent;
  let fixture: ComponentFixture<PlatformStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
