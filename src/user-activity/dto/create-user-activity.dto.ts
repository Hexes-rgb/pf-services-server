import { Activity } from "src/activity/entity/activity.entity";

export class CreateUserActivityDto {
    description: string;
    activity_start: string;
    activity_end: string;
    activity: Activity;
}