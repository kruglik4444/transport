import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { AddTruckComponent } from "./components/add-truck/add-truck.component";
import { AddCargoComponent } from "./components/add-cargo/add-cargo.component";
import { FindCargoComponent } from "./components/find-cargo/find-cargo.component";


const routes: Routes = [
    {
        path: 'add-truck',
        component: AddTruckComponent
    },
    {
        path: 'add-cargo',
        component: AddCargoComponent
    },
    {
        path: 'find-cargo',
        component: FindCargoComponent
    },
    {
        path: ':id',
        component: ProfileComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ProfileRoutingModule {}