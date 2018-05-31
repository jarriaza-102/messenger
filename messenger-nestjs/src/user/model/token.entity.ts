import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        name: 'token'
    })
    token:string;

    @Column({
        name: 'user_id'
    })
    userId:number;

    @Column({
        name: 'socket',
        nullable: true
    })
    socket:string;
}