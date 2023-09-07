import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('registration')
    async registration(@Body() createUserDto: CreateUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const userData = await this.userService.registration(createUserDto);
        res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return userData
    }

    @Post('login')

    async login(@Body() loginUserDto: LoginUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const userData = await this.userService.login(loginUserDto)
        res.cookie("refreshToken", userData.refreshToken, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
        return userData
    }
}
