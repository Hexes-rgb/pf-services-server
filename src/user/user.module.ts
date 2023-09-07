import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { TokensModule } from 'src/tokens/tokens.module';
import { TokensService } from 'src/tokens/tokens.service';
import { Tokens } from 'src/tokens/entity/tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TokensModule, TypeOrmModule.forFeature([Tokens])],
  controllers: [UserController],
  providers: [UserService, TokensService]
})
export class UserModule { }
