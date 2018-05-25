import { Module } from '@nestjs/common';
import {MessageService} from "./service/message.service";
import {MessageController} from "./controller/message.controller";
import {UserModule} from "../user/user.module";
import {Message} from "./model/message.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        UserModule
    ],
    controllers: [
        MessageController
    ],
    providers: [
        MessageService
    ]
})
export class MessageModule{}