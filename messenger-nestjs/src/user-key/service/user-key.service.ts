import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {UserKey} from "../model/user-key.entity";
import {Actions} from "../../core/actions/index";

@Injectable()
export class UserKeyService {

    constructor(
        @InjectRepository(UserKey)
        private userKeyRepository: Repository<UserKey>,
    ) {}

    async findOne(key: string, userId: number) {
        return await this.userKeyRepository.findOne({
            where: '"key" = ' + Actions.whereSupport(key) + ' AND "user_id" = ' + userId
        });
    }

    async findAll(userId: number) {
        return await this.userKeyRepository.findAll({
            where:'"user_id" = ' + userId
        });
    }

    async create (userKey: UserKey) {
        return await this.userKeyRepository.save(userKey);
    }

    async update (userKey: UserKey) {
        return await this.userKeyRepository.save(userKey);
    }

    async delete (userKey: UserKey) {
        return await this.userKeyRepository.delete(userKey);
    }
}