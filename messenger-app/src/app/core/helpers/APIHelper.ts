import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthUser} from "../../auth/auth/shared/auth-user";
import {isNullOrUndefined} from "util";

@Injectable()
export class APIHelper {

  private readonly URL = "http://localhost:3000/";

  constructor(protected httpClient: HttpClient) { }

  async getRequest(url) {
    return await this.httpClient.get(this.URL + url, APIHelper.getHeader()).toPromise();
  }

  async postRequest(url, body?, params?): Promise<any> {
    return await this.httpClient.post(this.URL + url, body, APIHelper.getHeader()).toPromise();
  }

  async patchRequest(url, body?, params?) {
    return await this.httpClient.patch(this.URL + url, body, APIHelper.getHeader()).toPromise();
  }

  async deleteRequest(url, params? ) {
    return await this.httpClient.delete(this.URL + url, APIHelper.getHeader()).toPromise();
  }

  static getHeader() {
    const token = APIHelper.getToken();
    if (token !== undefined) {
      return {
        headers: new HttpHeaders({
          'api-token': token
        })
      };
    }
    return;
  }

  static getToken() {
    const loggedUser = localStorage.getItem('authUser');
    if (!isNullOrUndefined(loggedUser)) {
      return (JSON.parse(loggedUser) as AuthUser).token;
    }
    return undefined;
  }

}
