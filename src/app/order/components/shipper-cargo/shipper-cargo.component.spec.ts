import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperCargoComponent } from './shipper-cargo.component';

describe('ShipperCargoComponent', () => {
  let component: ShipperCargoComponent;
  let fixture: ComponentFixture<ShipperCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipperCargoComponent]
    });
    fixture = TestBed.createComponent(ShipperCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
