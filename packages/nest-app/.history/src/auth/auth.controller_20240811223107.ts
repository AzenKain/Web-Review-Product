import { Controller } from '@nestjs/common';
@UseGuards(JwtGuardRestApiRefresh)
@Controller('auth')
export class AuthController {}
