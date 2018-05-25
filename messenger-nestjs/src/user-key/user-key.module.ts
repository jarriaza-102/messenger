import { Module } from '@nestjs/common';
import {UserKey} from "./model/user-key.entity";
import { TypeOrmModule } from '@nestjs/typeorm';
import {UserKeyService} from "./service/user-key.service";
import {UserKeyController} from "./controller/user-key.controller";
import {UserModule} from "../user/user.module";

@Module({
    controllers: [
        UserKeyController
    ],
    providers: [
        UserKeyService
    ],
    imports: [
        UserModule,
        TypeOrmModule.forFeature([UserKey])
    ]
})
export class UserKeyModule {}