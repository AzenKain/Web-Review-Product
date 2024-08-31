import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { OrderProductType } from "../order";

@ObjectType('ProductDetail')
export class ProductDetailType {
    @Field(() => ID)
    id: number;

    @Field(() => [ImageDetailType])
    imgDisplay: ImageDetailType[];

    @Field()
    size: string;

    @Field()
    brand: string;

    @Field(() => [String], { nullable: true })
    tags?: string[];

    @Field(() => [String], { nullable: true })
    fragranceNotes?: string[];

    @Field({ nullable: true })
    description?: string;
}

@ObjectType("ImageDetail")
export class ImageDetailType {
    @Field(() => ID)
    id: number;

    @Field()
    url: string;

    @Field(() => [String], { nullable: true })
    link?: string[];

    @Field(() => ProductDetailType, { nullable: true })
    productDetail?: ProductDetailType;
}
@ObjectType('Product')
export class ProductType {
    @Field(() => ID)
    id: number;

    @Field()
    name: string;

    @Field()
    isDisplay: boolean;

    @Field(() => Float)
    originCost: number;

    @Field(() => Float)
    displayCost: number;

    @Field(() => Int)
    stockQuantity: number;

    @Field()
    category: string;

    @Field({ nullable: true, defaultValue: 0 })
    buyCount?: number;

    @Field(() => Float, { nullable: true, defaultValue: 0 })
    rating?: number;

    @Field(() => ProductDetailType)
    details: ProductDetailType;

    @Field(() => [OrderProductType])
    orderProducts: OrderProductType[];

    @Field()
    created_at: Date;

    @Field()
    updated_at: Date;
}
