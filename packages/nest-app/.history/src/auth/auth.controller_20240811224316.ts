import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtGuardRestApi } from './guard';
import { AuthService } from './auth.service';
import { LoginDto, SignUpDto } from './dto';


@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}
    @UseGuards(JwtGuardRestApi)
    @Post('login')
    async LoginController(
        @Body() dto : LoginDto,
    ) {
        console.log(dto);
        return this.authService.LoginService(dto)
    }


    @Post('signup')
    async SignUpController(
        @Body() dto : SignUpDto,
    ) {
        console.log(dto);
        return this.authService.SignupService(dto)
    }

}
