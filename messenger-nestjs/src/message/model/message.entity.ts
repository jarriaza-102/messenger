import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Message {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    conversationId: number;

    @Column()
    message: string;

    @Column()
    messageType: number;

    @Column({
        nullable: true
    })
    answerId: number;

    slave: number;
}