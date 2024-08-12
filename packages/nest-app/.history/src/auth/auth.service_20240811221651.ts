import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types/user';
import { Repository } from 'typeorm';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private jwt: JwtService,
        private config: ConfigService,
        @InjectRepository(User) private userRespository: Repository<User>,
       
    ) { }
    async Login(userDto: LoginDto) {
        const userLogin = await this.userRespository.findOne({
            where: {
                email: userDto.email
            }
        });
        if (!userLogin)
            throw new ForbiddenException(
                'This user does not exist',
            );

        const pwMatches = await argon.verify(
            userLogin.hash,
            userDto.password,
        );

        if (!pwMatches)
            throw new ForbiddenException(
                'Wrong password',
            );
        const token = await this.signToken(userLogin.id, userLogin.email)
        await this.updateRefreshToken(userLogin.id, token.refresh_token)
        return token;
    }

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
