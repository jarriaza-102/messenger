import io from 'socket.io-client';
import {isNullOrUndefined} from '../utils/utils';
import {getLoggedUser} from '../utils/authUser';

let socket = undefined;

function setSocket() {
    if (isNullOrUndefined(socket)) {
        socket = io('http://localhost:3000');
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

/*if (socket === undefined) {
    setSocket();

    socket.on('receivedMessage', (data) => {
        console.log('receivedMessage starts');
        console.log(data);
        console.log('receivedMessage ends');
    });
}*/