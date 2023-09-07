// const jwt= require('jsonwebtoken')
import { sign, verify } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Tokens } from './entity/tokens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokensService {
    constructor(@InjectRepository(Tokens) private readonly tokensRepository: Repository<Tokens>) { }

    generateToken(payload: CreateUserDto) {
        const accessToken = sign(payload, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: '30m'
        })

        const refreshToken = sign(payload, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: '15d'
        })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token: string) {
        try {
            const userData = verify(token, process.env.JWT_ACCESS_TOKEN)
            return userData
        } catch (e) {
            return e
        }
    }

    validateRefreshToken(token: string) {
        try {
            const userData = verify(token, process.env.JWT_REFRESH_TOKEN)
            return userData
        } catch (e) {
            return e
        }
    }
    async saveToken(userId: any, refreshToken: string) {
        try {

            const tokenData = await this.tokensRepository
                .createQueryBuilder('tokens')
                .leftJoinAndSelect('tokens.user', 'user')
                .where('user.id = :userId', { userId })
                .getOne();
            console.log(tokenData);

            if (tokenData) {
                tokenData.refresh_token = refreshToken
                return await this.tokensRepository.save({ ...tokenData })
            }

            const token = await this.tokensRepository.create({ user: userId, refresh_token: refreshToken })
            return this.tokensRepository.save(token)
        } catch (e) {
            return e
        }
    }

    async removeToken(refreshToken: string) {
        const tokenData = await this.tokensRepository.delete({ refresh_token: refreshToken })
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await this.tokensRepository.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        return tokenData
    }
}
