import userApi from '../api/userApi';
import * as types from './actionTypes';

export async function loadUsers() {
    return async function(dispatch) {
        const users = await userApi.getAllUsers();
        dispatch(loadUsersSuccess(users));
        return loadUsersSuccess(users);
    };
}

export async function login(email, password) {
    const res = await userApi.login({
        email: email,
        password: password
    });
    return loadUsersSuccess(res.data);
}

export function loadUsersSuccess(users) {
    return {type: types.LOAD_USERS_SUCCESS, users};
}