import { messageConstants, httpStatus } from '../actions/actionTypes';

const initialState = {messages: []};
export function message(state = initialState, action) {
    switch (action.type) {
        case messageConstants.MESSAGE_REQUEST: {
            return {
                status: httpStatus.PROCESSING,
                messages: action.messages
            };
        }
        case messageConstants.MESSAGE_SUCCESS: {
            return {
                status: httpStatus.SUCCESS,
                messages: action.messages
            };
        }
        case messageConstants.MESSAGE_FAILURE: {
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