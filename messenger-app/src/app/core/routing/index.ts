import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "../../auth/auth/auth.component";
import {AuthGuard} from "../../auth/auth/shared/auth.guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: 'app/home/home.module#HomeModule',
    canActivate: [AuthGuard]
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
