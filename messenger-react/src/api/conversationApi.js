import {axiosHelper} from '../utils/axiosHelper'

const resource = 'conversations';

class ConversationsApi {

    static async findAll() {
        return await axiosHelper.getRequest( resource);
    }

    static async create(conversation) {
        return await axiosHelper.postRequest( resource, conversation);
    }
}

export default ConversationsApi;