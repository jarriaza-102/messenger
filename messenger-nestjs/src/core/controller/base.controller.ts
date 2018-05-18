import {APIResponse} from "../model/api-response";
export class BaseController {

    createErrorResponse(errorList: []) {
        return this.getResponse(false, 0, errorList);
    }

    createErrorResponse(error: string) {
        return this.getResponse(false, 0, [ error ]);
    }

    createSuccessResponse(data, count: number) {
        return this.getResponse(count, count, []);
    }

    createSuccessResponse(data) {
        return this.getResponse(data, 1, []);
    }

    getResponse(data, count, errors) {
        const apiResponse = new APIResponse();
        apiResponse.data = data;
        apiResponse.count = count;
        apiResponse.errors = errors;
        return apiResponse;
    }

}