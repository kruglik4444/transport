import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrierCargoComponent } from './carrier-cargo.component';

describe('CarrierCargoComponent', () => {
  let component: CarrierCargoComponent;
  let fixture: ComponentFixture<CarrierCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrierCargoComponent]
    });
    fixture = TestBed.createComponent(CarrierCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
