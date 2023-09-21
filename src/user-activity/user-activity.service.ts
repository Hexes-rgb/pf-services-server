import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserActivity } from './entity/user-activity.entity';
import { Repository } from 'typeorm';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import * as moment from 'moment';
import { User } from 'src/user/entity/user.entity';
import { Activity } from 'src/activity/entity/activity.entity';

@Injectable()
export class UserActivityService {
    constructor(@InjectRepository(UserActivity) private readonly userActivityRepository: Repository<UserActivity>) { }

    async createUserActivity(dto: CreateUserActivityDto, user: User){
        const { description, activity_start, activity_end, activity } = dto;

        const activityStart = moment(activity_start, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const activityEnd = moment(activity_end, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        
        const userActivity = await this.userActivityRepository.create({
            description: description,
            activity_start: activityStart,
            activity_end: activityEnd,
            user: user,
            activity: activity
        })
        
        await this.userActivityRepository.save(userActivity);
        return userActivity;
    }

    async changeUserActivity(dto: CreateUserActivityDto, id: number, user: User){
        const { description, activity_start, activity_end, activity } = dto;

        const activityStart = moment(activity_start, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        const activityEnd = moment(activity_end, 'DD/MM/YYYY HH:mm:ss').format('YYYY-MM-DD HH:mm:ss');
        
        const userActivity = await this.userActivityRepository.findOne({
            where: {
                id: id
            }
        })

        if(!userActivity || userActivity?.user.id !== user.id || user.role.name !== 'admin'){
            throw new BadRequestException('Can not find this user activity.')
        }

        userActivity.description = description;
        userActivity.activity_start = activityStart;
        userActivity.activity_end = activityEnd;
        userActivity.activity = activity;

        const updatedUserActivity = await this.userActivityRepository.save(userActivity);
        return updatedUserActivity;
    }

    async deleteUserActivity(id: number, user: User){        
        const userActivity = await this.userActivityRepository.findOne({
            where: {
                id: id
            },
            relations: ['user']
        })
        
        if(!userActivity){
            throw new BadRequestException('Can not find this user activity.')
        } else if((userActivity?.user.id !== user.id && user.role.name !== 'admin')){
            throw new BadRequestException('You do not have permissions.')
        }

        const updatedUserActivity = await this.userActivityRepository.delete(userActivity);
        return updatedUserActivity;
    }
}