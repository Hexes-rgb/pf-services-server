import { sign, verify } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entity/token.entity';
import { Repository } from 'typeorm';
import { CreateTokenDto } from 'src/user/dto/create-token.dto';

@Injectable()
export class TokenService {
    constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) { }

    generateToken(payload: CreateTokenDto) {
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
    async saveToken(userId: number, refreshToken: string) {
        try {

            const tokenData = await this.tokenRepository
                .createQueryBuilder('tokens')
                .leftJoinAndSelect('tokens.user', 'user')
                .where('user.id = :userId', { userId })
                .getOne();

            if (tokenData) {
                tokenData.refresh_token = refreshToken
                return await this.tokenRepository.save({ ...tokenData })
            }

            const token = await this.tokenRepository.create({ user: userId, refresh_token: refreshToken })
            return this.tokenRepository.save(token)
        } catch (e) {
            return e
        }
    }

    async removeToken(refreshToken: string) {
        const tokenData = await this.tokenRepository.delete({ refresh_token: refreshToken })
        return tokenData
    }

    async findToken(refreshToken: string) {
        const tokenData = await this.tokenRepository.findOne({
            where: {
                refresh_token: refreshToken
            }
        })
        return tokenData
    }
}
