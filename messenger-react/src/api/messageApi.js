import {axiosHelper} from '../utils/axiosHelper'

const resource = 'messages';

class MessageApi {

    static async send(message) {
        return await axiosHelper.postRequest(resource, message);
    }
}

export default MessageApi;