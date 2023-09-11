import { Body, Controller, Param, Post, Req, Res } from '@nestjs/common';
import { WishCardService } from './wish-card.service';
import { CreateWishCardDto } from './dto/create-wish-card.dto';
import { Request, Response } from 'express';

@Controller('wish-card')
export class WishCardController {
    constructor(private readonly wishCardService: WishCardService) { }

    @Post()
    createWishCard(@Body() wishCardDto: CreateWishCardDto, @Req() req: Request) {
        const authorization = req.headers['authorization']
        const token = authorization?.split(' ')[1]
        return this.wishCardService.createWishCard(wishCardDto, token)
    }

    @Post('change/:id')
    async changeWishCard(@Param() param, @Body() wishCardDto: CreateWishCardDto, @Req() req: Request) {
        const authorization = req.headers['authorization']
        const token = authorization?.split(' ')[1]
        return await this.wishCardService.changeWishCard(param.id, token, wishCardDto)
    }

    @Post('delete/:id')
    async deleteWishCard(@Param() param) {
        return await this.wishCardService.deleteWishCard(param.id)
    }
}
