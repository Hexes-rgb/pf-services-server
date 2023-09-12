import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entity/activity.entity';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivityService {
    constructor(@InjectRepository(Activity) private readonly activityRepository: Repository<Activity>) { }

    async createActivity(dto: CreateActivityDto) {
        const { name } = dto;
        const activity = await this.activityRepository.create({
            name: name
        })
        await this.activityRepository.save(activity)
        
        return activity
    }

    async changeActivity(dto: CreateActivityDto, id: number) {
        const { name } = dto;
        const activity = await this.activityRepository.findOne({
            where: {
                id: id
            }
        })
        
        if(!activity){
            throw new NotFoundException(`This activity not found.`);
        }
        activity.name = name;
        const updatedActivity = await this.activityRepository.save(activity)
        return updatedActivity
    }

    async deleteActivity(id: number){
        const activity = await this.activityRepository.findOne({
            where: {
                id: id
            }
        })
        if(!activity){
            throw new NotFoundException(`This activity not found.`);
        }
        return await this.activityRepository.delete({id})
    }
}
