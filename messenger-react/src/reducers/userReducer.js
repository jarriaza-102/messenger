import { userConstants, httpStatus } from '../actions/actionTypes';

const initialState = {users: []};
export function user(state = initialState, action) {
    switch (action.type) {
        case userConstants.SEARCH_REQUEST: {
            return {
                status: httpStatus.PROCESSING,
                users: action.users
            };
        }
        case userConstants.SEARCH_SUCCESS: {
            return {
                status: httpStatus.SUCCESS,
                users: action.users
            };
        }
        case userConstants.SEARCH_FAILURE: {
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