import { sign, verify, decode } from 'jsonwebtoken'
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { log } from 'console';
import { InjectRepository } from '@nestjs/typeorm';
import { Token } from 'src/token/entity/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization']
    const token = authorization?.split(' ')[1]

    if (!token) {
      throw new Error("not authenticated");
    }
    const isValidToken = verifyToken(token)
    console.log(isValidToken);

    if (!isValidToken) {
      const user = decode(token, process.env.JWT_ACCESS_TOKEN)
      delete user.iat
      delete user.exp
      const newToken = sign(user, process.env.JWT_ACCESS_TOKEN, {
        expiresIn: '30m'
      })
      console.log(user, newToken);
      res.setHeader('Authorization', newToken)
    }


    next();
  }
}


const verifyToken = (token: string) => {
  try {
    const isValidToken = verify(token, process.env.JWT_ACCESS_TOKEN)
    return isValidToken;
  } catch (error) {
    return false
  }
}