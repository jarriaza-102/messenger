import {axiosHelper} from '../utils/axiosHelper'

const resource = 'messages';

class MessageApi {

    static async send(message) {
        return await axiosHelper.postRequest(resource, message);
    }

    static async getAllByConversationId(conversationId) {
        return await axiosHelper.getRequest(resource + '/' + conversationId);
    }
}

export default MessageApi;