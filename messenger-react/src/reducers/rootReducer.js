import {combineReducers} from 'redux';
import {authentication} from './authReducer';
import {user} from './userReducer';

const rootReducer = combineReducers({
    authentication,
    user
});

export default rootReducer;