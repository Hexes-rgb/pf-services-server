import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivity } from 'src/user-activity/entity/user-activity.entity';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';
import { Activity } from './entity/activity.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserActivity, Activity])],
    controllers: [ActivityController],
    providers: [ActivityService]
  })
export class ActivityModule {}
