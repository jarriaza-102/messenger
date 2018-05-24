import {isNullOrUndefined} from './utils';

export function isLoggedUser() {
    const authUser = getLoggedUser();
    if (isNullOrUndefined(authUser)) {
        return false;
    }
    return true;
}

export function logUser(user) {
    localStorage.setItem('auth-user', JSON.stringify(user));
}

export function authHeader() {
    if (isLoggedUser()) {
        return { 'Authorization-Token': getLoggedUser().token };
    }
}

export function getLoggedUser() {
    return JSON.parse(localStorage.getItem('auth-user'));
}

export function logoutAuthUser() {
    localStorage.removeItem('auth-user');
}