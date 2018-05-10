import { Injectable } from '@angular/core';
import {APIHelper} from "../../../core/helpers/APIHelper";
import {ApiResponse} from "../../../core/helpers/ApiResponse";
import {Router} from "@angular/router";
import {AuthUser} from "./auth-user";
import {SocketService} from "../../../core/socket/socket.service";
import {Codes} from "../../../core/shared/codes";
import {isNullOrUndefined} from "util";

@Injectable()
export class AuthService {
  options = {
    loggedUser: undefined,
    isLoggedUser: false,
    authUserKey: 'authUser'
  };

  private readonly url = 'users';

  constructor(private route: Router, private apiHelper: APIHelper, private socketService: SocketService) { }

  async login(authUser: AuthUser): Promise<ApiResponse> {
    return await this.apiHelper.postRequest(
      this.url + '/login', authUser
    );
  }

  auth(authUser: AuthUser) {
     localStorage.setItem(this.options.authUserKey, JSON.stringify(authUser));
     this.options.loggedUser = authUser;
     this.options.isLoggedUser = true;
    this.socketService.login(authUser);
    this.route.navigate( [ Codes.getRedirectionRoute().home ]);
  }

  logout() {
    this.options.loggedUser = undefined;
    this.options.isLoggedUser = false;
    localStorage.removeItem(this.options.authUserKey);
    this.route.navigate( [ Codes.getRedirectionRoute().login ]);
  }

  loadCookie() {
    const loggedUser = localStorage.getItem(this.options.authUserKey);
    if (!isNullOrUndefined(loggedUser)) {
      this.options.loggedUser = JSON.parse(loggedUser) as AuthUser;
      this.options.isLoggedUser = true;
    }
  }

  getAuthUser(): AuthUser {
    this.loadCookie();
    return JSON.parse(this.options.loggedUser) as AuthUser;
  }

  isAuthUser(): boolean {
    this.loadCookie();
    console.log(this.options);
    return this.options.isLoggedUser;
  }

}
