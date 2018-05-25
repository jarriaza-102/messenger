import {Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, HttpStatus} from '@nestjs/common';
import {User} from "../model/user.entity";
import {UserService} from "../service/user.service";
import {AuthTokenGuard} from "../../core/guard/auth-token.guard";
import { HttpException } from '@nestjs/common';
import {BaseController} from "../../core/controller/base.controller";
import {Actions} from "../../core/actions/index";

@Controller('users')
@UseGuards(AuthTokenGuard)
export class UserController extends BaseController {

    constructor(private userService: UserService){
        super();
    }

    @Get()
    async findAll() {
        const users = await this.userService.findAll();
        return this.createArrSuccessResponse(users, users.length);
    }

    @Get(':id')
    async find(@Param('id') id, @Req() req) {
        const user = await this.validate(req, id);
        return this.createSuccessResponse(user);
    }

    @Post('logout')
    async logout(@Req() req) {
        return this.createSuccessResponse(await this.userService.logout(req.get(Actions.getAuthTokenHeaderName())));
    }

    @Post()
    async create(@Body() user: User) {
        return this.createSuccessResponse(await this.userService.create(user));
    }

    @Post('search')
    async search(@Body() user: User) {
        const users = await this.userService.search(user.fullName);
        return this.createArrSuccessResponse(users, users.length);
    }

    @Post('login')
    async login(@Body() user: User) {
        console.log(user);
        user = await this.userService.login(user);
        console.log(user);
        if (user === undefined) {
            return this.createErrorResponse('User does not exist');
        }
        return this.createSuccessResponse(user);
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() user: User, @Req() req) {
        const userToUpdate = this.validate(req, id);
        userToUpdate.fullName = user.fullName;
        userToUpdate.email = user.email;
        userToUpdate.password = user.password;
        return this.createSuccessResponse(await this.userService.update(userToUpdate));
    }

    @Delete(':id')
    async remove(@Param('id') id, @Req() req) {
        const user = this.validate(req, id);
        await this.userService.remove(user);
        return this.createSuccessResponse(true);
    }

    async validate(req, id) {
        const user = await this.userService.findByToken(req.get(Actions.getAuthTokenHeaderName()));
        if (user.id != id) {
            throw new HttpException('User does not match', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return user;
    }

}