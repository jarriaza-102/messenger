import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth/shared/auth.service";
import {CoreModule} from "../core/core.module";
import {AuthGuard} from "./auth/shared/auth.guard";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    CoreModule
  ],
  declarations: [
    AuthComponent
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class AuthModule { }
