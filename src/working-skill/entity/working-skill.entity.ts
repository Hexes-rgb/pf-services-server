import { User } from "src/user/entity/user.entity";
import { text } from "stream/consumers";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, Unique } from "typeorm";

@Entity({ name: 'working-skill' })
export class WorkingSkill {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255 })
    @Unique('title', [])
    title: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Timestamp;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Timestamp;

    @ManyToMany(type => User, (user) => user.working_skill)
    user_id: number[]
}