import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/pages/login/login.component';
import { EditProfileComponent } from './core/pages/edit-profile/edit-profile.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'company/:id',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [authGuard],
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule),
    canActivate: [authGuard],
  },
  {
    path: 'transport',
    loadChildren: () => import('./transport/transport.module').then(m => m.TransportModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
