import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'email'
    })
    email: string;

    @Column({name: 'full_name'})
    fullName: string;

    @Column({name: 'password'})
    password: string;

    setData(user : User) {
        this.email = user.email;
        this.fullName = user.fullName;
        return this;
    }

}