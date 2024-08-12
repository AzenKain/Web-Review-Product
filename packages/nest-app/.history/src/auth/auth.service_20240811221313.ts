import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types/user';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        @InjectRepository(User) private userRespository: Repository<User>,
       
    ) { }

    async signToken(
        id: string,
        email: string,
    ): Promise<{ access_token: string, refresh_token: string }> {

        const accessToken = await this.jwt.signAsync(
            {
                id: id,
                email,
            },
            {
                expiresIn: '15m',
                secret: this.config.get('JWT_SECRET'),
            },
        );

        const refreshToken = await this.jwt.signAsync(
            {
                id: id,
                email,
            },
            {
                expiresIn: '15d',
                secret: this.config.get('JWT_REFRESH_SECRET'),
            },
        );
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
    
}
