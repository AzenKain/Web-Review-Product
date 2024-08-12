import { Resolver } from '@nestjs/graphql';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService,
        private romchatGatway: RoomchatGateway
    ) {}
}
