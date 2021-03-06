import {messageConstants} from './actionTypes';
import messageApi from '../api/messageApi';
import {sendMessage} from '../socket';

export function send(message) {
    return dispatch => {
        dispatch(request(messageConstants.MESSAGE_REQUEST, undefined));
        return new Promise(async (resolve, reject) => {
            const response = await messageApi.send(message);
            dispatch(success(messageConstants.MESSAGE_SUCCESS, response.data));
            sendMessage(message);
            resolve(response);
        });
    };
}

export function getAllByConversationId(conversationId) {
    return dispatch => {
        dispatch(request(messageConstants.MESSAGE_REQUEST, undefined));
        return new Promise(async (resolve, reject) => {
            const response = await messageApi.getAllByConversationId(conversationId);
            dispatch(success(messageConstants.MESSAGE_SUCCESS, response.data));
            resolve(response);
        });
    };
}

function request(type, data) { return { type: type, data } }
function success(type, data) { return { type: type, data } }
function failure(type, errors) { return { type: type, errors } }