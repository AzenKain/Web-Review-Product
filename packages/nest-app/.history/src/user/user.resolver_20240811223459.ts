import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserType } from 'src/types/user';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService,
    ) {}

    // @UseGuards(JwtGuardGql)
    @HttpCode(200)
    @Query(()=>UserType)
    async getUser(
        @Args('id') userId: string
    ) {
        return await this.userService.getUser(userId);
    }
}
