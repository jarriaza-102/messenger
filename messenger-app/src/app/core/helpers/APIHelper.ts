import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class APIHelper {

  private readonly URL = "http://localhost:3000/";

  constructor(protected httpClient: HttpClient,) { }

  async getRequest(url) {
    return await this.httpClient.get(this.URL + url).toPromise();
  }

  async postRequest(url, body?, params?): Promise<any> {
    return await this.httpClient.post(this.URL + url, body).toPromise();
  }

  async patchRequest(url, body?, params?) {
    return await this.httpClient.patch(this.URL + url, body).toPromise();
  }

  async deleteRequest(url, params? ) {
    return await this.httpClient.delete(this.URL + url).toPromise();
  }

}
