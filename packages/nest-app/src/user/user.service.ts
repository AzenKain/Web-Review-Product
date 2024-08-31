import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/types/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,

    ) { }
    async getUser(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                secretKey: userId
            }
        });
        delete user.hash;
        delete user.refreshToken;
        return user;
    }
}
