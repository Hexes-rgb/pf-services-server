import { Role } from "src/role/entity/role.entity";
import { Token } from "src/token/entity/token.entity";
import { WishCard } from "src/wish-card/entity/wish-card.entity";
import { UserActivity } from "src/user-activity/entity/user-activity.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { WorkingSkill } from "src/working-skill/entity/working-skill.entity";

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

    @OneToOne(type => Token, (token) => token.user)
    token: Token

    @OneToMany(type => WishCard, (card) => card.user)
    wish_card: WishCard[]

    @ManyToMany(type => WorkingSkill, (skill) => skill.user_id)
    @JoinTable({
        name: 'user_working_skills',
        joinColumn: {
            name: 'user_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'working_skill_id',
            referencedColumnName: 'id'
        }
    })
    working_skill: WorkingSkill[]

    @ManyToOne(type => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: Role

    @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
    userActivities: UserActivity[];

    @Column({type: 'timestamp', nullable: true})
    last_login: string;
}
