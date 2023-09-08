import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { User } from 'src/user/entity/user.entity';
import { Token } from 'src/token/entity/token.entity';
import { TokenService } from 'src/token/token.service';
import { RoleModule } from 'src/role/role.module';
import { Role } from 'src/role/entity/role.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token, Role]), TokenModule, RoleModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService]
})
export class AuthModule {}
