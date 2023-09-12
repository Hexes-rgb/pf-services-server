import { UserActivity } from "src/user-activity/entity/user-activity.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'activity'})
export class Activity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 255, unique: true })
    name: string;

    @OneToMany(() => UserActivity, (userActivity) => userActivity.user)
    userActivities: number[];
}