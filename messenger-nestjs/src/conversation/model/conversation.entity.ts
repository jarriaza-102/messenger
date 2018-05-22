import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name: 'user_id_1'
    })
    userId1: number;

    @Column({
        name: 'user_id_2'
    })
    userId2: number;

    /*@Column({
        name: 'creation_date'
    })
    creationDate: any;*/

}