import { Body, Controller, Delete, Param, Post, Put, Req, Res } from '@nestjs/common';
import { WishCardService } from './wish-card.service';
import { CreateWishCardDto } from './dto/create-wish-card.dto';
import { Request, Response } from 'express';

@Controller('wish-card')
export class WishCardController {
    constructor(private readonly wishCardService: WishCardService) { }

    @Post('create')
    createWishCard(@Body() wishCardDto: CreateWishCardDto, @Req() req: Request) {
        const user = req['user']
        return this.wishCardService.createWishCard(wishCardDto, user.id)
    }

    @Put('change/:id')
    async changeWishCard(@Param() param, @Body() wishCardDto: CreateWishCardDto, @Req() req: Request) {
        const user = req['user']
        return await this.wishCardService.changeWishCard(param.id, user.id, wishCardDto)
    }

    @Delete('delete/:id')
    async deleteWishCard(@Param() param) {
        return await this.wishCardService.deleteWishCard(param.id)
    }
}
