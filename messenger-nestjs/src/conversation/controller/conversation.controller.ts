import {Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, HttpStatus} from '@nestjs/common';
import {AuthTokenGuard} from "../../core/guard/auth-token.guard";
import { HttpException } from '@nestjs/common';
import {BaseController} from "../../core/controller/base.controller";
import {ConversationService} from "../service/conversation.service";
import {Conversation} from "../model/conversation.entity";
import {TokenService} from "../../user/service/token.service";
import {Paging} from "../../core/model/paging";
import {Actions} from "../../core/actions/index";

@Controller('conversations')
@UseGuards(AuthTokenGuard)
export class ConversationController extends BaseController {

    constructor(private conversationService: ConversationService, private tokenService: TokenService) {
        super();
    }

    @Get()
    async findAll(@Req() req, @Body() paging: Paging) {
        const token = await this.tokenService.findByToken(req.get(Actions.getAuthTokenHeaderName()));
        const conversations = await this.conversationService.findAllByUser(token.userId, paging);
        return this.createArrSuccessResponse(conversations, conversations.length);
    }

    @Get(':id')
    async find(@Param('id') id, @Req() req, @Body() paging: Paging) {
        const token = await this.tokenService.findByToken(req.get(Actions.getAuthTokenHeaderName()));
        return this.createSuccessResponse(this.conversationService.findOne(id, token.userId));
    }

    @Post()
    async create(@Body() conversation: Conversation) {
        return this.createSuccessResponse(await this.conversationService.create(conversation));
    }

    @Delete(':id')
    async remove(@Param('id') id, @Req() req) {
        await this.conversationService.remove(await this.conversationService.findOne(id));
        return this.createSuccessResponse(true);
    }

}