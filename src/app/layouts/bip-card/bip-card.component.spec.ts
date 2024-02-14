import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BipCardComponent } from './bip-card.component';

describe('BipCardComponent', () => {
  let component: BipCardComponent;
  let fixture: ComponentFixture<BipCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BipCardComponent]
    });
    fixture = TestBed.createComponent(BipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
