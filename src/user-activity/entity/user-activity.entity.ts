import { Activity } from "src/activity/entity/activity.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity({ name: 'user_activity'})
export class UserActivity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, (user) => user.userActivities)
    @JoinColumn({name: 'user_id'})
    user: number;
    
    @ManyToOne(() => Activity, (activity) => activity.userActivities)
    @JoinColumn({name: 'activity_id'})
    activity: number;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'timestamp' })
    activity_start: Timestamp;
    
    @Column({ type: 'timestamp' })
    activity_end: Timestamp;
}