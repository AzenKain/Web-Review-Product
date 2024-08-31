import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/types/user';
import { OrderEntity } from 'src/types/order';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity]),],
  providers: [OrderService, OrderResolver]
})
export class OrderModule {}
