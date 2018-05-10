import { Component } from '@angular/core';
import {AuthUser} from "./shared/auth-user";
import {isNullOrUndefined} from "util";
import {APIResponseHandler} from "../../core/helpers/APIResponseHandler";
import {AuthService} from "./shared/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  authUser: AuthUser = new AuthUser();
  options = {
    isLoginFormSubmitted: false,
    validationErrors: []
  };

  constructor(private authService: AuthService) { }

  async onLogin() {
    this.options.validationErrors = [];
    this.options.isLoginFormSubmitted = true;
    if (isNullOrUndefined(this.authUser.email) || this.authUser.email.trim() == '')
      return;
    if (isNullOrUndefined(this.authUser.password) || this.authUser.password.trim() == '')
      return;

    const [err, response] = await APIResponseHandler.handle(this.authService.login(this.authUser), this.options.validationErrors);
    if (err) {
      this.options.validationErrors.push(err);
      return;
    }

    if (!response.Data) {
      if (response.ErrorMessages.length > 0) {
        this.options.validationErrors = response.ErrorMessages;
      }
      return;
    }
    this.authService.auth(response.Data as AuthUser);
  }

}
