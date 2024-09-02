
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
    constructor(
        config: ConfigService,
        private authService: AuthService,
        ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_REFRESH_SECRET'),
            passReqToCallback: true,
            ignoreExpiration: false,
        });
    }
    async validate(req: Request, payload:JwtPayload) {
        const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
        if (!refreshToken) throw new ForbiddenException('Refresh token malformed');

        return { ...payload, refreshToken };
    }
}