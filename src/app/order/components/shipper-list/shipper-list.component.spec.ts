import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipperListComponent } from './shipper-list.component';

describe('ShipperListComponent', () => {
  let component: ShipperListComponent;
  let fixture: ComponentFixture<ShipperListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipperListComponent]
    });
    fixture = TestBed.createComponent(ShipperListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
