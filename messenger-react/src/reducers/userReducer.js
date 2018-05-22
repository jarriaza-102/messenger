import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.users, action) {
    console.log('reducer');
    switch(action.type) {
        case types.LOAD_USERS_SUCCESS:
            return action.users;
        default:
            return state;
    }
}