
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-rest-refresh') {
    constructor(
        config: ConfigService,
        private authService: AuthService,
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
        });
    }
    async validate(req: Request, payload: {
        id: string,
        email: string, 
    }) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        const user = await this.authService.validateUser(payload.id, payload.email);
        if (!user) {
          throw new UnauthorizedException();
        }
        return { user, refreshToken };
    }
}