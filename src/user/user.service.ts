import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt'
import { TokenService } from 'src/token/token.service';

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

    async login(email: string, password: string) {

    }

    async logout(refreshToken: string) {

    }

    async refresh(email: string, password: string) {

    }


}
