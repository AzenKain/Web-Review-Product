import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { CreateProductDto, DeleteProductDto, UpdateProductDto } from './dtos';
import { ProductType } from 'src/types/product';
import { NullType } from 'src/types/nulltype';
import { JwtGuardGraphql } from 'src/auth/guard';
import { ProductService } from './product.service';
import { UserEntity } from 'src/types/user';
import { CurrentUser } from 'src/decorators/get-user-id.decorator';

@UseGuards(JwtGuardGraphql)
@Resolver(() => ProductType)
export class ProductResolver {
    constructor(
        private readonly productService: ProductService,
    ) { }

    @Mutation(() => ProductType)
    async GetProductById(
        @CurrentUser() user: UserEntity,
        @Args('productId') productId: number 
    ): Promise<ProductType> { 
        const product = await this.productService.GetProductByIdService(productId, user);
        return product;
    }

    @Mutation(() => ProductType)
    async CreateProduct(
        @CurrentUser() user: UserEntity,
        @Args('CreateProduct') dto: CreateProductDto
    ): Promise<ProductType> {
        const product = await this.productService.CreateProductService(dto, user);
        return product; 
    }

    // @Mutation(() => NullType)
    // async DeleteProduct(
    //     @CurrentUser() user: UserEntity,
    //     @Args('DeleteProduct') dto: DeleteProductDto
    // ): Promise<NullType> { 
    //     await this.productService.DeleteProductService(dto, user);
    //     return { data: null }; 
    // }

    // @Mutation(() => ProductType)
    // async UpdateProduct(
    //     @CurrentUser() user: UserEntity,
    //     @Args('UpdateProduct') dto: UpdateProductDto
    // ): Promise<ProductType| NullType> {
    //     const updatedProduct = await this.productService.UpdateProductService(dto, user);
    //     return { data: null }; 
    // }
}
