import io from 'socket.io-client';
import {isNullOrUndefined} from '../utils/utils';
import {getLoggedUser} from '../utils/authUser';

let socket = undefined;

function setSocket() {
    if (isNullOrUndefined(socket)) {
        socket = io('http://d91d3b40.ngrok.io');
        socket.emit('connection', { socket: socket.id, token: getLoggedUser().token });
    }
}

export function getSocket() {
    if (socket === undefined) setSocket();
    return socket;
}

export function sendMessage(message) {
    setSocket();
    socket.emit('message', {
        to: message.slave,
        from: getLoggedUser().user.id,
        message: message.message
    });
}