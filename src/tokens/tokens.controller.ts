import { Controller, Delete, Post } from '@nestjs/common';
import { TokensService } from './tokens.service';

@Controller('tokens')
export class TokensController {
    constructor(private readonly tokenService: TokensService) { }

    @Post()
    async create() {
        const asd = await this.tokenService.generateToken({ first_name: 'artem.kuskin7@gmail.com', last_name: "asdasda", password: 'asdasda', email: 'dasdasadsds' })
        return asd

    }

    @Post("save")
    async save() {
        return await this.tokenService.saveToken(6, '6')
    }

    @Delete()
    async delete() {
        return await this.tokenService.removeToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiYXJ0ZW0ua3Vza2luN0BnbWFpbC5jb20iLCJsYXN0X25hbWUiOiJhc2Rhc2RhIiwicGFzc3dvcmQiOiJhc2Rhc2RhIiwiZW1haWwiOiJkYXNkYXNhZHNkcyIsImlhdCI6MTY5NDAwNzA3NiwiZXhwIjoxNjk1MzAzMDc2fQ.RdTOnz08AMoyKO3lNZ9lpXRvs9aC7K3o69attQ0ERq0')
    }

    @Post('find')
    async find() {
        return await this.tokenService.findToken('1')
    }
}
