import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WishCard } from './entity/wish-card.entity';
import { WishCardService } from './wish-card.service';
import { WishCardController } from './wish-card.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WishCard])],
    providers: [WishCardService],
    controllers: [WishCardController]
})
export class WishCardModule {}
