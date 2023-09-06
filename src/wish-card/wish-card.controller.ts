import { Body, Controller, Post } from '@nestjs/common';
import { WishCardService } from './wish-card.service';
import { WishCardDto } from './dto/wish-card.dto';

@Controller('wish-card')
export class WishCardController {
    constructor(private readonly wishCardService: WishCardService) {}
    
    @Post()
    createWishCard(@Body()wishCardDto: WishCardDto) {
        return this.wishCardService.createWishCard(wishCardDto)
    }
}
