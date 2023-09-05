import { Controller } from '@nestjs/common';
import { WishCardService } from './wish-card.service';

@Controller('wish-card')
export class WishCardController {
    constructor(private readonly wishCardService: WishCardService) {}
}
