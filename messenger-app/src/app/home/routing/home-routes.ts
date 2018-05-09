import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeBaseComponent} from "../home-base/home-base.component";
import {ConversationsComponent} from "../conversations/conversations.component";

const homeRoutes: Routes = [
  {
    path: '', component: HomeBaseComponent,
    children: [
      {
        path: '',
        component: ConversationsComponent,
        pathMatch: 'full'
      }
    ]
  }
];

export const homeRouting: ModuleWithProviders = RouterModule.forChild(homeRoutes);
