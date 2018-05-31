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

    async findTokensByUserId(id: number) : Promise<Token[]> {
        return await this.tokenRepository.find({
            where: 'user_id = ' + id
        });
    }

    async findByToken(token: string) : Promise<Token> {
        return await this.tokenRepository.findOne({
            where: 'token = ' + Actions.whereSupport(token)
        });
    }

    async findBySocket(socket: string) : Promise<Token> {
        return await this.tokenRepository.findOne({
            where: 'socket = ' + Actions.whereSupport(socket)
        });
    }

    async logout(authToken: string) : Promise<Token> {
        const token = await this.findByToken(authToken);
        await this.tokenRepository.remove(token);
        return true;
    }

    async save(userId: number, socket: string) : Promise<Token> {
        const hash = Actions.generateRandomString();
        const token = new Token();
        token.token = hash;
        token.userId = userId;
        token.socket = socket;
        return await this.tokenRepository.save(token);
    }

    async update(token: Token) : Promise<Token> {
        return await this.tokenRepository.save(token);
    }

}