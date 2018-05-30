import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../model/message.entity";
import {Actions} from "../../core/actions/index";

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
    ) {}

    async findAllByConversationId(conversationId: number) {
        return await this.messageRepository.query('select * from get_conversation_messages('+conversationId+')');
    }

    async create (message: Message) {
        const conversationId = await this.checkIfConversationExists(message.userId, message.slave);
        if (conversationId > 0) {
            message.conversationId = conversationId;
            return await this.messageRepository.save(message);
        }
        const conversation = await this.messageRepository.query('select create_conversation('+message.userId+','+message.slave+')');
        message.conversationId = conversation[0].create_conversation;
        return await this.messageRepository.save(message);
    }

    async checkIfConversationExists(userId, userId2) {
        const result = await this.messageRepository.query('select * from check_conversation_exists('+userId+','+userId2+')');
        return (result.length > 0) ? result[0].conversationid : 0;
    }
}