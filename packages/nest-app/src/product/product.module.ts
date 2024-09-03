import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/types/user';
import { ImageDetailEntity, ProductDetailEntity, ProductEntity, TagsEntity } from 'src/types/product';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, ProductEntity, ProductDetailEntity, ImageDetailEntity, TagsEntity]),],
  providers: [ProductResolver, ProductService]
})
export class ProductModule {}
