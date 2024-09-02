import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtGuardGraphql } from 'src/auth/guard';
import { OrderType } from 'src/types/order';
import { UserEntity } from 'src/types/user';
import { createOrderDto, SearchOrderDto, updateOrderDto } from './dtos';
import { OrderService } from './order.service';
import { CurrentUserGraphql } from 'src/decorators';

@UseGuards(JwtGuardGraphql)
@Resolver()
export class OrderResolver {
    constructor(
        private readonly orderService: OrderService,
    ) { }

    @Query(() => [OrderType])
    async SearchOrderWithOption(
        @CurrentUserGraphql() user: UserEntity,
        @Args('SearchOrder') dto: SearchOrderDto
    ): Promise<OrderType[]> { 
        return await this.orderService.SearchOrderWithOptionsServices(dto, user)
    }

    @Query(() => OrderType)
    async GetOrderById(
        @CurrentUserGraphql() user: UserEntity,
        @Args('orderId') orderId: number 
    ): Promise<OrderType> { 
        return await this.orderService.GetOrderById(orderId, user)
    }
    

    @Mutation(() => OrderType)
    async CreateOrder(
        @CurrentUserGraphql() user: UserEntity,
        @Args('CreateOrder') dto: createOrderDto
    ): Promise<OrderType> {
        return await this.orderService.CreateOderService(dto, user)
    }

    @Mutation(() => OrderType)
    async UpdateOrder(
        @CurrentUserGraphql() user: UserEntity,
        @Args('UpdateOrder') dto: updateOrderDto
    ): Promise<OrderType> {
        return await this.orderService.UpdateOrderService(dto, user)
    }
}
