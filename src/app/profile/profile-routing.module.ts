import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { AddTruckComponent } from "./components/add-truck/add-truck.component";
import { AddCargoComponent } from "./components/add-cargo/add-cargo.component";
import { CargoListComponent } from "./components/cargo-list/cargo-list.component";

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    },
    {
        path: 'add-truck',
        component: AddTruckComponent
    },
    {
        path: 'add-cargo',
        component: AddCargoComponent
    },
    {
        path: 'cargo-list',
        component: CargoListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ProfileRoutingModule {}