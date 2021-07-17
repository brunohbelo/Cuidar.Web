import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatformStatsFamiliesComponent } from './platform-stats-families.component';

describe('PlatformStatsFamiliesComponent', () => {
  let component: PlatformStatsFamiliesComponent;
  let fixture: ComponentFixture<PlatformStatsFamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatformStatsFamiliesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatformStatsFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
