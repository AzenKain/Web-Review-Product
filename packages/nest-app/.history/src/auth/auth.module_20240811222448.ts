import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/types/user/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategyAccess } from './strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User]),PassportModule ],
  providers: [AuthService, JwtStrategyAccess],
  controllers: [AuthController]
})
export class AuthModule {}
