import { Module } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tokens } from './entity/tokens.entity';
import { TokensController } from './tokens.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tokens])],
  providers: [TokensService],
  controllers: [TokensController],
})
export class TokensModule { }
