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

    @Column({
        name: 'photo',
        nullable: true
    })
    photo: string;

    setData(user : User) {
        this.id = user.id;
        this.email = user.email;
        this.fullName = user.fullName;
        this.photo = (user.photo !== null) ? user.photo : 'default.jpg';
        return this;
    }

}