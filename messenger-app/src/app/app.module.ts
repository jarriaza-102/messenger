import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import {AuthModule} from "./auth/auth.module";
import {routing} from "./core/routing/";
import {NgxElectronModule} from "ngx-electron";
import {HttpClientModule} from "@angular/common/http";
import {MessengerModule} from "./messenger/messenger.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routing,
    AuthModule,
    NgxElectronModule,
    MessengerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
