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
    created_at: Timestamp;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Timestamp;

    @ManyToOne(type => User, (user) => user.wish_card)
    @JoinColumn({ name: 'user_id' })
    user_id: number
}