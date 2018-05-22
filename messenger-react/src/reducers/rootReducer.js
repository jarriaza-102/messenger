/**
 * Created by viaro on 5/22/2018.
 */
import {combineReducers} from 'redux';
import users from './userReducer';

const rootReducer = combineReducers({
    users
});

export default rootReducer;