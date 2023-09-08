import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TokenModule } from 'src/token/token.module';
import { User } from 'src/user/entity/user.entity';
import { Token } from 'src/token/entity/token.entity';
import { TokenService } from 'src/token/token.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Token]), TokenModule],
  controllers: [AuthController],
  providers: [AuthService, TokenService]
})
export class AuthModule {}
