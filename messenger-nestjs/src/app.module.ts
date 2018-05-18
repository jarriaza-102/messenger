import { NestModule, Module, MiddlewareConsumer } from '@nestjs/common';
import {UserModule} from "./user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LoggedUserMiddleware} from "./core/middleware/logged-user.middleware";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        UserModule
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
