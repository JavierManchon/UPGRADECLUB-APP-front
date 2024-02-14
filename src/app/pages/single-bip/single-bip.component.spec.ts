import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBipComponent } from './single-bip.component';

describe('SingleBipComponent', () => {
  let component: SingleBipComponent;
  let fixture: ComponentFixture<SingleBipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingleBipComponent]
    });
    fixture = TestBed.createComponent(SingleBipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
