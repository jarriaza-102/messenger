import { Module } from '@nestjs/common';
import {MessagesGateway} from "./messages/messages.gateway";
import {UserModule} from "../user/user.module";

@Module ({
    providers: [
        MessagesGateway
    ],
    imports: [
        UserModule
    ]
})
export class WebSocketModule {}