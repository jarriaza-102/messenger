
import { SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse } from '@nestjs/websockets';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import {TokenService} from "../../user/service/token.service";
import {UseGuards} from "@nestjs/common";
import {AuthTokenGuard} from "../../core/guard/auth-token.guard";

@WebSocketGateway()
export class MessagesGateway {

    constructor(private tokenService: TokenService) {}

    @WebSocketServer() server;

    @SubscribeMessage('connection')
    async onConnection(client, data: any): Observable<WsResponse<number>> {
        const token = await this.tokenService.findByToken(data.token);
        token.socket = client.id;
        await this.tokenService.update(token);
        const event = 'connection';
        //Response for same
        return {
            event,
            data: {}
        };
    }

    //@UseGuards(AuthTokenGuard)
    @SubscribeMessage('message')
    async onMessage(client, data: any): Observable<WsResponse<number>> {
        const event = 'message';
        console.log('Emmit Message');
        //Broadcast
        //this.server.emit('testing', { message: data.message});

        if (data.to) {
            const results = await this.tokenService.findTokensByUserId(data.to);
            if (results !== undefined && results.length > 0) {
                for (var i=0;i<results.length;i++) {
                    const socket = results[i].socket;
                    if (this.server.sockets.connected[socket] !== undefined) {
                        this.server.sockets.connected[socket].emit('receivedMessage', {message: data.message, from: data.from});
                    } else {
                        console.log('Socket doesnt exist ' + socket);
                    }
                }
            }
        }

        return {
            event,
            data: {
                message: data.message
            }
        };
    }
}