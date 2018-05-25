import { Module } from '@nestjs/common';
import {UserModule} from "../user/user.module";
import {ConversationService} from "./service/conversation.service";
import {ConversationController} from "./controller/conversation.controller";
import { TypeOrmModule } from '@nestjs/typeorm';
import {Conversation} from "./model/conversation.entity";

@Module({
    imports: [
        UserModule,
        TypeOrmModule.forFeature([Conversation])
    ],
    providers: [
        ConversationService
    ],
    controllers: [
        ConversationController
    ]
})
export class ConversationModule{}