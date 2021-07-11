import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyMenuComponent } from './family-menu.component';

describe('FamilyMenuComponent', () => {
  let component: FamilyMenuComponent;
  let fixture: ComponentFixture<FamilyMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilyMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
