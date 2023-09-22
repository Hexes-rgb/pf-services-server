import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishCard } from './entity/wish-card.entity';
import { Equal, Repository } from 'typeorm';
import { CreateWishCardDto } from './dto/create-wish-card.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class WishCardService {
    constructor(@InjectRepository(WishCard) private readonly wishCardRepository: Repository<WishCard>) { }

    async createWishCard(dto: CreateWishCardDto, userId: User) {
        try {
            const wishCard = await this.wishCardRepository.create({
                description: dto.description,
                title: dto.title,
                user: userId
            })
            if (!dto.title || !dto.description) {
                throw new BadRequestException('Wish card title or description not provided', { cause: new Error() })
            }
            return await this.wishCardRepository.save(wishCard)
        } catch (e) {
            return e
        }
    }


    async changeWishCard(cardId: number, user: User | undefined, wishCardDto) {
        try {
            const wishCard = await this.wishCardRepository.findOne({
                where: {
                    id: cardId,
                    user: Equal(user)
                }
            })
            const newWishCard = {
                id: wishCard?.id,
                description: wishCardDto.description,
                title: wishCardDto.title,
                user_id: wishCard?.user
            }
            const result = await this.wishCardRepository.save(newWishCard)
            return result
        } catch (e) {
            return e
        }
    }

    async deleteWishCard(id: number) {
        const wishCard = await this.wishCardRepository.findOne({
            where: {
                id: id,
            }
        })
        if (!wishCard) {
            throw new BadRequestException('Wish card not found')
        }
        return await this.wishCardRepository.delete({ id })
    }
}
