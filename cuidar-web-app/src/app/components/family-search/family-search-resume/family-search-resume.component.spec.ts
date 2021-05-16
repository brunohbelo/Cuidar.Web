import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySearchResumeComponent } from './family-search-resume.component';

describe('FamilySearchResumeComponent', () => {
  let component: FamilySearchResumeComponent;
  let fixture: ComponentFixture<FamilySearchResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilySearchResumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySearchResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
