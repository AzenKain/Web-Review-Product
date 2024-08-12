import { Controller, UseGuards } from '@nestjs/common';
import { JwtGuardRestApi } from './guard';
import { AuthService } from './auth.service';

@UseGuards(JwtGuardRestApi)
@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('addAdmin')
    async addAdmin(
        @Body() dto : AdminDto,
    ) {
        console.log(dto);
        return this.authService.addAdmin(dto)
    }


    @Post('addAdmin')
    async addAdmin(
        @Body() dto : AdminDto,
    ) {
        console.log(dto);
        return this.authService.addAdmin(dto)
    }

}
