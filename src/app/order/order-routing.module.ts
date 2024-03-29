import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';
import { CarrierCargoComponent } from './components/carrier-cargo/carrier-cargo.component';
import { ShipperCargoComponent } from './components/shipper-cargo/shipper-cargo.component';

const routes: Routes = [
  {
    path: '',
    component: OrderComponent,
  },
  {
    path: 'shipper/:id',
    component: ShipperCargoComponent,
  },
  {
    path: 'carrier/:id',
    component: CarrierCargoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderRoutingModule {}
