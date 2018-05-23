import { userConstants, httpStatus } from '../actions/actionTypes';
import {isLoggedUser} from '../utils/authUser';

const initialState = { isLoggedUser: isLoggedUser() };
export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                status: httpStatus.PROCESSING,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                status: httpStatus.SUCCESS,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {
                status: httpStatus.ERROR,
                errors: action.errors
            };
        case userConstants.LOGOUT:
            return {};
        default:
            return state
    }
}