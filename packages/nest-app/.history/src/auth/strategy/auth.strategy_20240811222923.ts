
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/types/user';

@Injectable()
export class JwtStrategyAccess extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private authService: AuthService,
        config: ConfigService,
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }
    async validate(
        id: string,
        email: string, 
    ) {
        const user = await this.AuthService.validateUser(id, email);
        if (!user) {
          throw new UnauthorizedException();
        }
        return user;
    }
}