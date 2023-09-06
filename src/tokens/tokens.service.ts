const jwt= require('jsonwebtoken')
// import {sign} from 'jsonwebtoken'
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Tokens } from './entity/tokens.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokensService {
    constructor(@InjectRepository(Tokens) private readonly tokensRepository:Repository<Tokens>) {}

    generateToken(payload: CreateUserDto) {
        const accessToken =  jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: '30m'
        })

        const refreshToken =  jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
            expiresIn: '15d'
        })
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token:string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN)
            return userData
        } catch(e) {
            return e
        }
    }

    validateRefreshToken(token:string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN)
            return userData
        } catch(e) {
            return e
        }
    }
    async saveToken(userId: any, refreshToken: string) {
        const tokenData = await this.tokensRepository.findOne({
            where: {
                user_id: userId
            }
        })
        if(tokenData) {
            tokenData.refresh_token = refreshToken
            
            return this.tokensRepository.save(tokenData)
        }

        const token = await this.tokensRepository.create({user_id: userId, refresh_token: refreshToken})
        return this.tokensRepository.save(token)
    }
}
