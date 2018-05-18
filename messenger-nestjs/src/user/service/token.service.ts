import {Injectable} from "@nestjs/common";
import {Token} from "../model/token.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Actions} from "../../core/actions";

@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(Token)
        private tokenRepository: Repository<Token>,
    ) {}

    async findByUserId(id: number) : Promise<Token> {
        return await this.tokenRepository.findOne({
            where: 'user_id = ' + id
        });
    }

    async findByToken(token: string) : Promise<Token> {
        return await this.tokenRepository.findOne({
            where: 'token = ' + Actions.whereSupport(token)
        });
    }

    async save(userId: number) : Promise<Token> {
        const hash = Actions.generateRandomString();
        const token = new Token();
        token.token = hash;
        token.userId = userId;
        return await this.tokenRepository.save(token);;
    }

}