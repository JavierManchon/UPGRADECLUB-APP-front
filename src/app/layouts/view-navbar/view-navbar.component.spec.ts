import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNavbarComponent } from './view-navbar.component';

describe('ViewNavbarComponent', () => {
  let component: ViewNavbarComponent;
  let fixture: ComponentFixture<ViewNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewNavbarComponent]
    });
    fixture = TestBed.createComponent(ViewNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
