import { Controller } from '@nestjs/common';

@UseGuards(JwtGuardRestApi)
@Controller('auth')
export class AuthController {}
