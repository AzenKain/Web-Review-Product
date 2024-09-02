import { Field, Float, ID, Int, ObjectType } from "@nestjs/graphql";
import { OrderProductType } from "../order";

@ObjectType('TagsDetail')
export class TagsDetailType {
    @Field(() => ID)
    id: number;

    @Field()
    type: string;

    @Field()
    value: string;
}

@ObjectType('ProductDetail')
export class ProductDetailType {
    @Field(() => ID)
    id: number;

    @Field(() => [ImageDetailType])
    imgDisplay: ImageDetailType[];

    @Field(()=>TagsDetailType)
    size: TagsDetailType;

    @Field(()=>TagsDetailType)
    brand: TagsDetailType;

    @Field(()=>TagsDetailType)
    fragranceNotes: TagsDetailType;
    
    @Field(()=>TagsDetailType)
    concentration: TagsDetailType;

    @Field(()=>TagsDetailType)
    sex: TagsDetailType;

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

    @Field({ nullable: true})
    category?: string;

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
