import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuardRestApi } from './guard';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto';

@UseGuards(JwtGuardRestApi)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    async LoginController(
        @Body() dto : Log,
    ) {
        console.log(dto);
        return this.authService.addAdmin(dto)
    }


    @Post('signup')
    async SignUpController(
        @Body() dto : SignUpDto,
    ) {
        console.log(dto);
        return this.authService.addAdmin(dto)
    }

}
