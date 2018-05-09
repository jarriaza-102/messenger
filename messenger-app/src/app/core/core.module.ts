import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {APIHelper} from "./helpers/APIHelper";
import {AlertComponent} from "./alert/alert.component";
import {SocketService} from "./socket/socket.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertComponent
  ],
  providers: [
    APIHelper,
    SocketService
  ],
  exports: [
    AlertComponent
  ]
})
export class CoreModule { }
