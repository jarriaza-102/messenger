import {Injectable} from "@angular/core";
import {APIHelper} from "../../core/helpers/APIHelper";
import {ApiResponse} from "../../core/helpers/ApiResponse";
@Injectable()
export class ConversationService {

  private readonly url = 'conversations';

  constructor(private apiHelper: APIHelper) { }

  async getAll(): Promise<ApiResponse> {
    return await this.apiHelper.postRequest(
      this.url, { limit: 10 }
    );
  }

}
