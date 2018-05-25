import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name: string;

    @Column()
    owner: number;

    @Column()
    creationDate: number;

    @Column()
    conversationType: number;

    @Column()
    statusId: number;

    @Column({
        nullable: true
    })
    isGroupConversation: boolean;

    @Column({
        nullable: true
    })
    slave: number;
}