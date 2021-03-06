import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {User} from "../model/user.entity";
import {TokenService} from "./token.service";
import {Actions} from "../../core/actions";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private tokenService: TokenService
    ) {}

    async login(user: User) : Promise<User> {
        const login = await this.userRepository.findOne({
            where: 'email = ' + Actions.whereSupport(user.email) + ' AND password = ' + Actions.whereSupport(user.password)
        });
        if (login === undefined) return;
        const token = await this.tokenService.save(login.id, user.socket);
        return {
            token: token.token,
            user: login
        };
    }

    async findByToken(token: string) : Promise<User> {
        const _token = await this.tokenService.findByToken(token);
        if (_token === undefined) return;
        return await this.findOne(_token.userId);
    }

    async findAll() : Promise<User[]> {
        const users = await this.userRepository.find();
        return users.map((user) => {
            return (new User()).setData(user);
        });
    }

    async search(fullName: string) : Promise<User[]> {
        const users = await this.userRepository.find({
            where: 'UPPER("fullName") LIKE ' + Actions.likeSupport(fullName)
        });
        return users.map((user) => {
            return (new User()).setData(user);
        });
    }

    async findOne(id: number) : Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (user.photo === null) user.photo = 'default';
        return user;
    }

    async logout(token: string) {
        return await this.tokenService.logout(token);
    }

    async create(user: User) : Promise<User> {
        const user = await this.userRepository.save(user);
        if (user.photo === null) user.photo = 'default';
        return user;
    }

    async update(user: User) : Promise<User> {
        const user = await this.userRepository.save(user);
        user.photo = 'default';
        return user;
    }

    async remove(user: User) : Promise<User> {
        return await this.userRepository.remove(user);;
    }

}
