import { Tokens } from "src/tokens/entity/tokens.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    first_name: string;

    @Column({ length: 255 })
    last_name: string;

    @Column({ length: 255 })
    password: string;

    @Column({ length: 255 })
    email: string;

    @OneToOne(type => Tokens, (token) => token.user)
    token: Tokens

    // @Column('timestamp')
    // created_at: Timestamp;

    // @Column('timestamp')
    // updated_at: Timestamp;
}