import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilySuspendPromoteComponent } from './family-suspend-promote.component';

describe('FamilySuspendPromoteComponent', () => {
  let component: FamilySuspendPromoteComponent;
  let fixture: ComponentFixture<FamilySuspendPromoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FamilySuspendPromoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilySuspendPromoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
