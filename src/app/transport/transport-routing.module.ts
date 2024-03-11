import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TransportListComponent } from "./components/transport-list/transport-list.component";
import { AddTransportComponent } from "./components/add-transport/add-transport.component";
import { TransportItemComponent } from "./components/transport-item/transport-item.component";

const routes: Routes = [
    {
        path: 'list',
        component: TransportListComponent,
    },
    {
        path: 'add-new',
        component: AddTransportComponent,
    },
    {
        path: ':id',
        component: TransportItemComponent,
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class TransportRoutingModule {}