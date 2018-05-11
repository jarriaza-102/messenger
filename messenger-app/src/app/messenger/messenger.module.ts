import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationsComponent } from './conversations/conversations.component';
import {CoreModule} from "../core/core.module";
import {MessengerBaseComponent} from "./messenger-base/messenger-base.component";
import {FormsModule} from "@angular/forms";
import { SearchComponent } from './search/search.component';
import {UserService} from "./shared/user.service";
import {ConversationService} from "./shared/conversation.service";
import {MatInputModule, MatListModule, MatTabsModule, MatIconModule} from "@angular/material";
import { GroupsComponent } from './groups/groups.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MatInputModule,
    MatListModule,
    MatTabsModule,
    MatIconModule
  ],
  declarations: [
    ConversationsComponent,
    MessengerBaseComponent,
    SearchComponent,
    GroupsComponent
  ],
  exports: [
    ConversationsComponent
  ],
  providers: [
    UserService,
    ConversationService
  ]
})
export class MessengerModule { }
