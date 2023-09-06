import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tokens'})
export class Tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.id)
    @JoinColumn({name: 'user_id'})
    user_id: User

    @Column({length: 555})
    refresh_token: string
}