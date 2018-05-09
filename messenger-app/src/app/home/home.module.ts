import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationsComponent } from './conversations/conversations.component';
import {CoreModule} from "../core/core.module";
import {homeRouting} from "./routing/home-routes";
import {HomeBaseComponent} from "./home-base/home-base.component";

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    homeRouting
  ],
  declarations: [
    ConversationsComponent,
    HomeBaseComponent
  ]
})
export class HomeModule { }
