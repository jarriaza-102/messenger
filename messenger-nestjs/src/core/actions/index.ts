export class Actions {

    static whereSupport(param: string) : string {
        return '\'' + param + '\'';
    }

    static generateRandomString() {
        const randomString = require("randomstring");
        return randomString.generate();
    }

}