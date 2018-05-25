import { Entity, Column } from 'typeorm';

@Entity()
export class UserKey {

    @Column({
        primary: true
    })
    key: string;

    @Column({
        primary: true
    })
    userId: number;

    @Column()
    value: string;

}