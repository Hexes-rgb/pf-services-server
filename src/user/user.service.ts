import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userRepository:Repository<User>) {}
    
    async createUser(dto) {
    const user = await this.userRepository.create(dto)
    this.userRepository.save(user)
    }
}
