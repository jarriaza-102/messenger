import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Actions} from "../../core/actions";
import {Conversation} from "../model/conversation.entity";
import {Paging} from "../../core/model/paging";

@Injectable()
export class ConversationService {

    constructor(
        @InjectRepository(Conversation)
        private conversationRepository: Repository<Conversation>
    ) {}

    async findOne(id: number, userId: number) : Promise<Conversation> {
        return await this.conversationRepository.findOne(id, {
                where: 'user_id_1 = ' + userId + ' OR user_id_1 = ' + userId
            });
    }

    async findAllByUser(userId: number, paging: Paging) : Promise<Conversation[]> {
        return await this.conversationRepository.query('SELECT * FROM get_conversations_by_user('+userId+')');
    }

    async create(conversation: Conversation) : Promise<Conversation> {
        return await this.conversationRepository.save(conversation);
    }

    async update(conversation: Conversation) : Promise<Conversation> {
        return await this.conversationRepository.save(conversation);
    }

    async remove(conversation: Conversation) : Promise<Conversation> {
        return await this.conversationRepository.remove(conversation);
    }

}