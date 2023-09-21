import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({ name: 'wish_card' })
export class WishCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column('text')
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: string;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: string;

    @ManyToOne(type => User, (user) => user.wish_card)
    @JoinColumn({ name: 'user_id' })
    user: User
}