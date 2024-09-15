import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserEntity, UserType } from 'src/types/user';
import { HttpCode } from '@nestjs/common';
import { CurrentUserGraphql } from 'src/decorators';
import { CreateUserDto } from './dtos';

@Resolver()
export class UserResolver {
    constructor(
        private userService: UserService,
    ) { }

    @Mutation(() => UserType)
    async CreateUser(
        @CurrentUserGraphql() user: UserEntity,
        @Args('CreateUser') dto: CreateUserDto,
    ): Promise<UserType> {
        return await this.userService.CreateUserService(dto, user)
    }

    @Mutation(() => [UserType])
    async CreateUserByList(
        @CurrentUserGraphql() user: UserEntity,
        @Args({ name: 'CreateUser', type: () => [CreateUserDto] }) dto: CreateUserDto[],
    ): Promise<UserType[]> {
        return await this.userService.CreateUserByListService(dto, user);
    }
    @Mutation(() => UserType)
    async UpdateUser(
        @CurrentUserGraphql() user: UserEntity,
        @Args('UpdateUser') dto: CreateUserDto,
    ): Promise<UserType> {
        return await this.userService.CreateUserService(dto, user)
    }

    @Mutation(() => UserType)
    async DeleteUser(
        @CurrentUserGraphql() user: UserEntity,
        @Args('DeleteUser') dto: CreateUserDto,
    ): Promise<UserType> {
        return await this.userService.CreateUserService(dto, user)
    }

    @HttpCode(200)
    @Query(() => UserType)
    async GetUserById(
        @CurrentUserGraphql() user: UserEntity,
        @Args('id') userId: string
    ) {
        return await this.userService.GetUserByIdService(userId, user);
    }
}
