import {combineReducers} from 'redux';
import {authentication} from './authReducer';
import {user} from './userReducer';
import {conversation} from './conversationReducer';
import {message} from './messageReducer';

const rootReducer = combineReducers({
    authentication,
    user,
    conversation,
    message
});

export default rootReducer;