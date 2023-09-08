import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenService } from 'src/token/token.service';
import { CreateUserDto } from 'src/auth/dto/create-user.dto';
import { LoginUserDto } from 'src/auth/dto/login-user.dto';
import { User } from 'src/user/entity/user.entity';
import { hash, compare } from 'bcrypt'
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly tokenService: TokenService) { }

    async registration(dto: CreateUserDto) {
        try {
            const { email, firstName, lastName, password, role } = dto
            const hashPassword = await hash(password, 3)
            const candidate = await this.userRepository.findOne({
                where: {
                    email: email
                }
            })
            if (candidate) {
                throw new BadRequestException(`User with email ${email} exists`, { cause: new Error() })
            }
            const user = this.userRepository.create({
                first_name: firstName,
                last_name: lastName,
                password: hashPassword,
                email,
                role: role ? role : 2
            })
            await this.userRepository.save(user)
            const tokens = await this.tokenService.generateToken({ ...user })
            await this.tokenService.saveToken(user.id, tokens.refreshToken)
            return {
                accessToken: tokens.accessToken,
                user
            }
        } catch (e) {
            return e
        }
    }

    async login(loginUserDto: LoginUserDto) {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email
            },
            relations: ['role']
        })
        if (!user) {
            throw new BadRequestException(`User with this email was not found`, { cause: new Error() })
        }
        const isPassEquel = await compare(loginUserDto.password, user.password)
        if (!isPassEquel) {
            throw new BadRequestException(`Incorrect password`, { cause: new Error() })
        }
        const tokens = await this.tokenService.generateToken({ ...user })
        await this.tokenService.saveToken(user.id, tokens.refreshToken)
        return {
            accessToken: tokens.accessToken,
            user,
        }
    }

    async logout(accessToken: string) {
        try{
            const userData = await this.tokenService.validateAccessToken(accessToken)
            
            const token = await this.tokenService.findTokenByUserId(userData.id);
            
            const result = await this.tokenService.removeToken(token?.refresh_token);
            return result
        }catch(e){
            return e;
        }
    }

    async refresh(refreshToken: string) {
        // if (!refreshToken) {
        //     throw new BadRequestException(`You are not authorized`, { cause: new Error() })
        // }
        // const userData = await this.tokenService.validateRefreshToken(refreshToken)
        // console.log(userData);

        // if (!userData.id) {
        //     throw new BadRequestException(`You are not authorized`, { cause: new Error() })
        // }

        // const user = await this.userRepository.findOne({
        //     where: {
        //         id: userData.id
        //     }
        // })
        // console.log(user);

        // // const tokens = await this.tokenService.generateToken({ ...user })
        // // await this.tokenService.saveToken(userData?.id, tokens.refreshToken)
        // // return {
        // //     ...tokens,
        // //     user
        // // }
    }
}
