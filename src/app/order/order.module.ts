import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderRoutingModule } from './order-routing.module';
import { CarrierCargoComponent } from './components/carrier-cargo/carrier-cargo.component';
import { ShipperCargoComponent } from './components/shipper-cargo/shipper-cargo.component';
import { CarrierListComponent } from './components/carrier-list/carrier-list.component';
import { ShipperListComponent } from './components/shipper-list/shipper-list.component';



@NgModule({
  declarations: [
    OrderComponent,
    CarrierCargoComponent,
    ShipperCargoComponent,
    CarrierListComponent,
    ShipperListComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
  ]
})
export class OrderModule { }
