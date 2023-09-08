import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/token.service';
import { Token } from 'src/token/entity/token.entity';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/entity/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokenModule, TypeOrmModule.forFeature([Token]), RoleModule, TypeOrmModule.forFeature([Role])],
  controllers: [UserController],
  providers: [UserService, TokenService]
})
export class UserModule { }
