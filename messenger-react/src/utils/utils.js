export function isNullOrUndefined(param) {
    return param === undefined || param === null || param === '';
}

export function isLoggedUser() {
    const authUser = localStorage.getItem('auth-user');
    if (isNullOrUndefined(authUser)) {
        return false;
    }
    return true;
}

export const API_URL = 'http://localhost:3000/'