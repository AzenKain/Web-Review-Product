import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from 'src/types/user';

@Module({
  imports: [TypeOrmModule.forFeature([User]),],
  providers: [UserService, UserResolver]
})
export class UserModule {}
