import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ProfileComponent } from "./profile.component";
import { AddTruckComponent } from "./components/add-truck/add-truck.component";

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent
    },
    {
        path: 'add-truck',
        component: AddTruckComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ProfileRoutingModule {}