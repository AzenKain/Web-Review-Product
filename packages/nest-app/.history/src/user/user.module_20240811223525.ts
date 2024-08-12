import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([User, CommitEntity, OtpCode]),],
  providers: [UserService, UserResolver]
})
export class UserModule {}
