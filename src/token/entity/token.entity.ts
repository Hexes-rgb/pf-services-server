import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'token' })
export class Token {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(type => User, (user) => user.token)
    @JoinColumn({ name: 'user_id' })
    user: number

    @Column({ length: 555 })
    refresh_token: string
}