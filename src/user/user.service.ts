import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash, compare } from 'bcrypt'
import { TokenService } from 'src/token/token.service';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly tokenService: TokenService) { }

    async registration(dto: CreateUserDto) {
        try {
            const { email, firstName, lastName, password } = dto
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
                email
            })
            await this.userRepository.save(user)
            const tokens = await this.tokenService.generateToken({ ...user })
            await this.tokenService.saveToken(user.id, tokens.refreshToken)
            return {
                ...tokens,
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
            }
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
            ...tokens,
            user,
        }
    }

    async logout(refreshToken: string) {
        const token = await this.tokenService.removeToken(refreshToken)
        return token
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
