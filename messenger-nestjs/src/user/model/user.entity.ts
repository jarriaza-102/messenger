import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: 'email'
    })
    email: string;

    @Column()
    fullName: string;

    @Column()
    password: string;

    @Column()
    photo: string;

    @Column()
    role: number;

    roleName: string;

    socketId: string;

    setData(user : User) {
        this.id = user.id;
        this.email = user.email;
        this.fullName = user.fullName;
        this.photo = (user.photo !== null) ? user.photo : 'default';
        this.role = user.role;
        this.roleName = user.roleName;
        return this;
    }

}