import { NestModule, Module, MiddlewareConsumer } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoggedUserMiddleware} from "./core/middleware/logged-user.middleware";
import {UserKeyModule} from "./user-key/user-key.module";
import {ConversationModule} from "./conversation/conversation.module";
import {MessageModule} from "./message/message.module";
import {WebSocketModule} from "./web-sockets/web-socket.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule,
        UserKeyModule,
        ConversationModule,
        MessageModule,
        WebSocketModule
    ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer
            .apply(LoggedUserMiddleware)
            .with('AppModule')
            .forRoutes(
                '**'
            );
    }
}
