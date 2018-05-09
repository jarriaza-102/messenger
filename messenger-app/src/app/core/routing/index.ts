import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "../../auth/auth/auth.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    //canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
