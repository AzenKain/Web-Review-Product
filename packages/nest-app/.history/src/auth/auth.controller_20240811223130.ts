import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuardRestApi } from './guard';

@UseGuards(JwtGuardRestApi)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private romchatGatway: RoomchatGateway
    ){}
}
