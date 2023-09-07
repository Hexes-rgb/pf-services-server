import { Body, Controller, Post } from '@nestjs/common';
import { WishCardService } from './wish-card.service';
import { CreateWishCardDto } from './dto/create-wish-card.dto';

@Controller('wish-card')
export class WishCardController {
    constructor(private readonly wishCardService: WishCardService) {}
    
    @Post()
    createWishCard(@Body()wishCardDto: CreateWishCardDto) {
        return this.wishCardService.createWishCard(wishCardDto)
    }
}
