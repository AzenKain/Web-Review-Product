import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductDto, DeleteProductDto, SearchProductDto, UpdateProductDto } from './dtos';
import { ProductType } from 'src/types/product';
import { ResponseType } from 'src/types/response.type';
import { JwtGuardGraphql } from 'src/auth/guard';
import { ProductService } from './product.service';
import { UserEntity } from 'src/types/user';
import { CurrentUserGraphql } from 'src/decorators';

@Resolver(() => ProductType)
export class ProductResolver {
    constructor(
        private readonly productService: ProductService,
    ) { }


    @Query(() => [ProductType])
    async SearchProductWithOptions(
        @Args('SearchProduct') dto: SearchProductDto
    ): Promise<ProductType[]> { 
        return await this.productService.SearchProductWithOptionsService(dto)
    }

    @Query(() => ProductType)
    async GetProductById(
        @Args('productId') productId: number 
    ): Promise<ProductType> { 
        const product = await this.productService.GetProductByIdService(productId);
        return product;
    }
    
    @UseGuards(JwtGuardGraphql)
    @Mutation(() => ProductType)
    async CreateProduct(
        @CurrentUserGraphql() user: UserEntity,
        @Args('CreateProduct') dto: CreateProductDto
    ): Promise<ProductType> {
        const product = await this.productService.CreateProductService(dto, user);
        return product; 
    }

    @UseGuards(JwtGuardGraphql)
    @Mutation(() => ResponseType)
    async DeleteProduct(
        @CurrentUserGraphql() user: UserEntity,
        @Args('DeleteProduct') dto: DeleteProductDto
    ): Promise<ResponseType> { 
        return await this.productService.DeleteProductService(dto, user);
    }

    @UseGuards(JwtGuardGraphql)
    @Mutation(() => ProductType)
    async UpdateProduct(
        @CurrentUserGraphql() user: UserEntity,
        @Args('UpdateProduct') dto: UpdateProductDto
    ): Promise<ProductType> {
        return await this.productService.UpdateProductService(dto, user);
    }
}
