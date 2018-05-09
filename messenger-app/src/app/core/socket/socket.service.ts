import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from "rxjs/Rx";
import {AuthUser} from "../../auth/auth/shared/auth-user";
import {isNullOrUndefined} from "util";

@Injectable()
export class SocketService {
  socket: any;

  static getQueryParams() {
    const query = {};
    const loggedUser = localStorage.getItem('authUser');
    if (isNullOrUndefined(loggedUser)) {
      return query;
    }
    return JSON.parse(loggedUser) as AuthUser;
  }

  setSocket() {
    if (isNullOrUndefined(this.socket)) {
      this.socket = io('http://localhost:3000', {
        query: SocketService.getQueryParams(),
        autoConnect: true
      });
    }
  }

  login(user: AuthUser){
    this.setSocket();
    this.socket.emit('login', user.idUser);
  }

  logout(user: AuthUser){
    this.setSocket();
    this.socket.emit('logout', user.idUser);
  }

  getNotification()  {
    this.setSocket();
    return this.getObservable('notification').map(data => data);
  }

  getObservable(action: string) : Observable<any> {
    return (new Observable( observer => {
      this.socket.on(action, (data) => {
        observer.next(data);
      });

      return function () {
        this.socket.removeListener(action);
      };

    })).share();
  }

}
