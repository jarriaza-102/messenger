import {Controller, Get, Post, Param, UseGuards, Req, Body} from '@nestjs/common';
import {AuthTokenGuard} from "../../core/guard/auth-token.guard";
import {BaseController} from "../../core/controller/base.controller";
import {MessageService} from "../service/message.service";
import {Message} from "../model/message.entity";
import {Actions} from "../../core/actions/index";
import {UserService} from "../../user/service/user.service";

@Controller('messages')
@UseGuards(AuthTokenGuard)
export class MessageController extends BaseController{

    constructor(private messageService: MessageService, private userService: UserService){
        super();
    }

    @Get(':conversationId')
    async findAlByConversationId(@Param('conversationId') conversationId) {
        return this.createSuccessResponse(await this.messageService.findAllByConversationId(conversationId));
    }

    @Post()
    async create(@Body() message: Message, @Req() req) {
        const user = await this.userService.findByToken(req.get(Actions.getAuthTokenHeaderName()));
        message.userId = user.id;
        return this.createSuccessResponse(await this.messageService.create(message));
    }

}