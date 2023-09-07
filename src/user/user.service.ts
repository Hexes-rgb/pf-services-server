import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
// const bcrypt = require("bcrypt");
import { hash } from 'bcrypt'
import { TokensService } from 'src/tokens/tokens.service';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>, private readonly tokenService: TokensService) { }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto)
        this.userRepository.save(user)
    }

    async registration(dto: CreateUserDto) {
        try {
            const { email, first_name, last_name, password } = dto
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
                first_name,
                last_name,
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

    async loguot(refreshToken: string) {

    }

    async refresh(email: string, password: string) {

    }


}
