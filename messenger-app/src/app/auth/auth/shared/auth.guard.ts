import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "./auth.service";
import {Codes} from "../../../core/shared/codes";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (next.url[0].path === 'login') {
      if (this.authService.isAuthUser()) {
        this.router.navigate([ Codes.getRedirectionRoute().home ]);
        return false;
      }
      return true;
    }

    if (this.authService.isAuthUser()) {
      return true;
    }
    this.router.navigate([ Codes.getRedirectionRoute().login ], { queryParams: { returnUrl: state.url }});
    return false;
  }
}
