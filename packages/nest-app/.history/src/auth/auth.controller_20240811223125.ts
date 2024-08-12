import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuardRestApi } from './guard';

@UseGuards(JwtGuardRestApi)
@Controller('auth')
export class AuthController {
    
}
