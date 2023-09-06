import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishCard } from './entity/wish-card.entity';
import { Repository } from 'typeorm';
import { WishCardDto } from './dto/wish-card.dto';

@Injectable()
export class WishCardService {
    constructor(@InjectRepository(WishCard) private readonly wishCardRepository:Repository<WishCard>) {}

    async createWishCard(dto:WishCardDto) {
        const wishCard = this.wishCardRepository.create(dto)
        if (!dto.title || !dto.description) {
            throw new BadRequestException('Wish card title or description not provided', { cause: new Error() })
        }


        return await this.wishCardRepository.save(wishCard)
    }
}
