import { conversationConstants, httpStatus } from '../actions/actionTypes';

const initialState = {conversations: []};
export function conversation(state = initialState, action) {
    switch (action.type) {
        case conversationConstants.CONVERSATION_REQUEST: {
            return {
                status: httpStatus.PROCESSING,
                conversations: action.conversations
            };
        }
        case conversationConstants.CONVERSATION_SUCCESS: {
            return {
                status: httpStatus.SUCCESS,
                conversations: action.conversations
            };
        }
        case conversationConstants.CONVERSATION_FAILURE: {
            return {
                status: httpStatus.ERROR,
                errors: action.errors
            };
        }
        default: {
            return state;
        }
    }
}