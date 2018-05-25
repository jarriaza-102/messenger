import {conversationConstants} from './actionTypes';
import conversationsApi from '../api/conversationApi';

export function findAll() {
    return dispatch => {
        dispatch(request(conversationConstants.CONVERSATION_REQUEST, undefined));
        return new Promise(async (resolve, reject) => {
            const response = await conversationsApi.findAll();
            dispatch(success(conversationConstants.CONVERSATION_SUCCESS, response.data));
            resolve(response);
        });
    };
}

export function create(conversation) {
    return dispatch => {
        dispatch(request(conversationConstants.CONVERSATION_REQUEST, conversation));
        return new Promise(async (resolve, reject) => {
            const response = await conversationsApi.create(conversation);
            dispatch(success(conversationConstants.CONVERSATION_SUCCESS, response.data));
            resolve(response);
        });
    };
}

function request(type, data) { return { type: type, data } }
function success(type, data) { return { type: type, data } }
function failure(type, errors) { return { type: type, errors } }