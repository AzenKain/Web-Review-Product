import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        @InjectRepository(User) private userRepository: Repository<User>,

    ) { }
    async getUser(userId: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });
        delete user.hash;
        delete user.refreshToken;
        return user;
    }
}
