import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from 'src/activity/activity.module';
import { Activity } from 'src/activity/entity/activity.entity';
import { User } from 'src/user/entity/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([User, Activity]), ActivityModule ,UserModule],
    controllers: [],
    providers: []
  })
export class UserActivityModule {}
