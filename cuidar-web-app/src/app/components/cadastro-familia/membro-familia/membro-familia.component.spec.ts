import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembroFamiliaComponent } from './membro-familia.component';

describe('MembroFamiliaComponent', () => {
  let component: MembroFamiliaComponent;
  let fixture: ComponentFixture<MembroFamiliaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembroFamiliaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembroFamiliaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
