import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthComponent} from "../../auth/auth/auth.component";
import {AuthGuard} from "../../auth/auth/shared/auth.guard";
import {ConversationsComponent} from "../../messenger/conversations/conversations.component";
import {GroupsComponent} from "../../messenger/groups/groups.component";
import {MessengerBaseComponent} from "../../messenger/messenger-base/messenger-base.component";

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
    component: MessengerBaseComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
