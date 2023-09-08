import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: AuthService) { }

    @Post('registration')
    async registration(@Body() createUserDto: CreateUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const userData = await this.userService.registration(createUserDto);
        res.cookie("accessToken", userData.accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        })
        return userData
    }

    @Post('login')

    async login(@Body() loginUserDto: LoginUserDto, @Req() req: Request, @Res({ passthrough: true }) res: Response) {
        const userData = await this.userService.login(loginUserDto)
        res.cookie("accessToken", userData.accessToken, {
            maxAge: 60 * 60 * 1000,
            httpOnly: true,
        })
        return userData
    }

    @Post('logout')
    async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
        try{
            const { accessToken } = req.cookies
            const token = await this.userService.logout(accessToken)
            res.clearCookie('accessToken')
            return token
        }catch(e){
            return e
        }
    }


    // @Post('refresh')
    // async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    //     const { refreshToken } = req.cookies
    //     const userData = await this.userService.refresh(refreshToken)
    //     // const newRefreshToken = userData.refreshToken
    //     // res.cookie("refreshToken", newRefreshToken, {
    //     //     maxAge: 15 * 24 * 60 * 60 * 10000,
    //     //     httpOnly: true,
    //     // });
    //     // res.clearCookie('refreshToken')
    //     return userData
    // }
}
