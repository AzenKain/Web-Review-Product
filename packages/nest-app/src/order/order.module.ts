import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/types/user';
import { CustomerInfoEntity, DeliveryInfoEntity, OrderEntity, OrderProductEntity } from 'src/types/order';
import { ProductEntity } from 'src/types/product';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, OrderEntity, DeliveryInfoEntity, CustomerInfoEntity, OrderProductEntity, ProductEntity]),],
  providers: [OrderService, OrderResolver]
})
export class OrderModule {}
