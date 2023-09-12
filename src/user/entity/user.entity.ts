import { Role } from "src/role/entity/role.entity";
import { Token } from "src/token/entity/token.entity";
import { UserActivity } from "src/user-activity/entity/user-activity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

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
    token: string

    @ManyToOne(type => Role, (role) => role.users)
    @JoinColumn({ name: 'role_id' })
    role: number

    @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
    userActivities: number[];

    @Column({type: 'timestamp', nullable: true})
    last_login: Timestamp;
}