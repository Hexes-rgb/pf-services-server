import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from 'src/activity/activity.module';
import { Activity } from 'src/activity/entity/activity.entity';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserActivityController } from './user-activity.controller';
import { UserActivityService } from './user-activity.service';
import { UserActivity } from './entity/user-activity.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Activity, UserActivity]), ActivityModule ,UserModule],
    controllers: [UserActivityController],
    providers: [UserActivityService]
  })
export class UserActivityModule {}
