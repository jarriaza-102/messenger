import { Module } from '@nestjs/common';
import {UserController} from "./controller/user.controller";
import {UserService} from "./service/user.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./model/user.entity";
import {Token} from "./model/token.entity";
import {TokenService} from "./service/token.service";

@Module({
    imports:[
        TypeOrmModule.forFeature([User, Token])
    ],
    controllers: [
        UserController
    ],
    providers: [
        UserService,
        TokenService
    ],
    exports: [
        UserService,
        TokenService
    ]
})
export class UserModule {}