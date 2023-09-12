import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/entity/role.entity';
import { ActivityModule } from 'src/activity/activity.module';
import { UserActivity } from 'src/user-activity/entity/user-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserActivity]), RoleModule, ActivityModule],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
