import {Injectable} from "@angular/core";
import {ApiResponse} from "../../core/helpers/ApiResponse";
import {APIHelper} from "../../core/helpers/APIHelper";

@Injectable()
export class UserService {

  private readonly url = 'users';

  constructor(private apiHelper: APIHelper) { }

  async search(searchTearm: string): Promise<ApiResponse> {
    return await this.apiHelper.postRequest(
      this.url + '/search', { full_name: searchTearm, limit: 5 }
    );
  }

}
