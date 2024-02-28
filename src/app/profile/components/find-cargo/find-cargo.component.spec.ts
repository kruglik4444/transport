import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindCargoComponent } from './find-cargo.component';

describe('FindCargoComponent', () => {
  let component: FindCargoComponent;
  let fixture: ComponentFixture<FindCargoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindCargoComponent]
    });
    fixture = TestBed.createComponent(FindCargoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
