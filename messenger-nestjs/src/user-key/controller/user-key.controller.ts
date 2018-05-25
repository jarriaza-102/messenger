import {Controller, Get, Post, Param, Patch, Delete, UseGuards, Req} from '@nestjs/common';
import {AuthTokenGuard} from "../../core/guard/auth-token.guard";
import {BaseController} from "../../core/controller/base.controller";
import {UserKeyService} from "../service/user-key.service";
import {UserKey} from "../model/user-key.entity";
import {UserService} from "../../user/service/user.service";
import {Actions} from "../../core/actions/index";

@Controller('user-keys')
@UseGuards(AuthTokenGuard)
export class UserKeyController extends BaseController{

    constructor(private userKeyService: UserKeyService, private userService: UserService){
        super();
    }

    @Get()
    async findAll(@Req() req) {
        const user = await this.userService.findByToken(req.get(Actions.getAuthTokenHeaderName()));
        const userKeys = await this.userKeyService.findAll(user.id);
        return this.createArrSuccessResponse(userKeys, userKeys.length);
    }

    @Get(':key')
    async findOne(@Param('key') key, @Req() req) {
        const user = await this.userService.findByToken(req.get(Actions.getAuthTokenHeaderName()));
        return this.createSuccessResponse(await this.userKeyService.findOne(key, user.id));
    }

    @Post()
    async create(userKey: UserKey) {
        return this.createSuccessResponse(await this.userKeyService.create(userKey));
    }

    @Patch(':key')
    async update(@Param('key') key, @Req() req, userKey: UserKey) {
        const user = await this.userService.findByToken(req.get(Actions.getAuthTokenHeaderName()));
        const userKeyToUpdate = await this.userKeyService.findOne(key, user.id);
        userKeyToUpdate.value = userKey.value;
        return this.createSuccessResponse(await this.userKeyService.update(userKeyToUpdate));
    }

    @Delete()
    async remove(userKey: UserKey) {
        await this.userKeyService.remove(userKey)
        return this.createSuccessResponse(true);
    }

}