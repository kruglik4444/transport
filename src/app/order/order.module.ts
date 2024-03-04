import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { CarrierCargoComponent } from './components/carrier-cargo/carrier-cargo.component';
import { ShipperCargoComponent } from './components/shipper-cargo/shipper-cargo.component';



@NgModule({
  declarations: [
    OrderComponent,
    CarrierCargoComponent,
    ShipperCargoComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
  ]
})
export class OrderModule { }
