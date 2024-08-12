import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuardRestApi } from './guard';
import { AuthService } from './auth.service';

@UseGuards(JwtGuardRestApi)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private romchatGatway: RoomchatGateway
    ){}
}
