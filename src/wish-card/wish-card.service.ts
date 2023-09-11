import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WishCard } from './entity/wish-card.entity';
import { Repository } from 'typeorm';
import { CreateWishCardDto } from './dto/create-wish-card.dto';
import { decode } from 'jsonwebtoken'

@Injectable()
export class WishCardService {
    constructor(@InjectRepository(WishCard) private readonly wishCardRepository: Repository<WishCard>) { }

    async createWishCard(dto: CreateWishCardDto, token: string | undefined) {
        try {

            const userId = decode(token, process.env.JWT_ACCESS_TOKEN).id
            dto.user_id = userId
            const wishCard = await this.wishCardRepository.create({
                description: dto.description,
                title: dto.title,
                user_id: userId
            })
            if (!dto.title || !dto.description) {
                throw new BadRequestException('Wish card title or description not provided', { cause: new Error() })
            }
            return await this.wishCardRepository.save(wishCard)
        } catch (e) {
            return e
        }
    }


    async changeWishCard(cardId: number, token: string | undefined, wishCardDto) {
        try {

            const userId = decode(token, process.env.JWT_ACCESS_TOKEN).id
            console.log(cardId);

            const wishCard = await this.wishCardRepository.findOne({
                where: {
                    id: cardId,
                    user_id: userId
                }
            })
            const newWishCard = {
                id: wishCard?.id,
                description: wishCardDto.description,
                title: wishCardDto.title,
                user_id: wishCard?.user_id
            }
            const result = await this.wishCardRepository.save(newWishCard)
            return result
        } catch (e) {
            return e
        }
    }

    async deleteWishCard(id: number) {
        return await this.wishCardRepository.delete({ id })
    }
}
