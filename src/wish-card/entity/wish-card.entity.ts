import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({ name: 'wish_card'})
export class WishCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    title: string;

    @Column('text')
    description: string;

    @Column({ type: 'timestamp',nullable: true})
    created_at: Timestamp;

    @Column({ type: 'timestamp',nullable: true})
    updated_at: Timestamp;
}