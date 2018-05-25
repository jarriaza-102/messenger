export class Actions {

    static whereSupport(param: string) : string {
        return '\'' + param + '\'';
    }

    static likeSupport(param: string) : string {
        return 'UPPER(\'' + param + '%\')';
    }

    static generateRandomString() {
        const randomString = require("randomstring");
        return randomString.generate();
    }

    static getAuthTokenHeaderName() {
        return 'Authorization-Token';
    }

}