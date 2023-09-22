import { sign, verify } from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from './entity/token.entity';
import { Equal, Repository } from 'typeorm';
import { CreateTokenDto } from 'src/auth/dto/create-token.dto';
import { User } from 'src/user/entity/user.entity';

@Injectable()
export class TokenService {
    constructor(@InjectRepository(Token) private readonly tokenRepository: Repository<Token>) { }

    generateToken(payload: CreateTokenDto) {
        try {
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
        } catch (e) {
            return e
        }
    }

    validateAccessToken(token: string): User {
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
    async saveToken(userId: User, refreshToken: string) {
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

    async removeToken(refreshToken: string | undefined) {
        try {
            const tokenData = await this.tokenRepository.delete({ refresh_token: refreshToken })
            return tokenData
        } catch (e) {
            return e
        }
    }

    async findTokenByUserId(user: User) {
        try {            
            const tokenData = await this.tokenRepository.findOne({
                where: {
                    user: Equal(user.id)
                }
            })
            return tokenData
        } catch (e) {
            return e
        }
    }

    async findTokenByName(refresh_token: string) {
        try {
            const tokenData = await this.tokenRepository.findOne({
                where: {
                    refresh_token: refresh_token
                }
            })
            return tokenData
        } catch (e) {
            return e
        }
    }
}
