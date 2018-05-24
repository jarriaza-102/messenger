import userApi from '../api/userApi';
import {userConstants} from './actionTypes';

export function login(username, password) {
    return dispatch => {
        const user = { email: username, password: password };
        dispatch(request(userConstants.LOGIN_REQUEST, user));
        return new Promise(async (resolve, reject) => {{
            const response = await userApi.login({ email: username, password: password });
            if (!response.data) {
                dispatch(failure(userConstants.LOGIN_FAILURE, response.errors));
                resolve(response);
                return;
            }
            dispatch(success(userConstants.LOGIN_SUCCESS, response.data));
            resolve(response);
        }})
    };
}

export function search(param) {
    return dispatch => {
        dispatch(request(userConstants.SEARCH_REQUEST, param));
        return new Promise(async (resolve, reject) => {
            const response = await userApi.search({ fullName: param });
            dispatch(success(userConstants.SEARCH_SUCCESS, response.data));
            resolve(response);
        });
    };
}

export function logout() {
    return dispatch => {
        return new Promise(async (resolve, reject) => {
            const response = await userApi.logout();
            dispatch(success(userConstants.LOGOUT, response.data));
            resolve(response);
        });
    };
}

function request(type, data) { return { type: type, data } }
function success(type, data) { return { type: type, data } }
function failure(type, errors) { return { type: type, errors } }