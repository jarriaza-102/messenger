import {APIResponse} from "../model/api-response";
export class BaseController {

    createErrorResponse(errorList: []) {
        return this.getResponse(false, 0, errorList);
    }

    createErrorResponse(error: string) {
        return this.getResponse(false, 0, [ error ]);
    }

    createArrSuccessResponse(data, count: number) {
        return this.getResponse(data, count, []);
    }

    createSuccessResponse(data) {
        return this.getResponse(data, 1, []);
    }

    getResponse(data, count, errors) {
        const apiResponse = new APIResponse();
        apiResponse.data = data;
        apiResponse.count = count;
        var i=0;
        apiResponse.errors = errors.map( (error) => { const response = { error: error, index: i }; i++; return response; });
        return apiResponse;
    }

}