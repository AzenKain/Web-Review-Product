import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@InputType()
export class TagsDetailInp {
    @IsOptional()
    @IsString()
    @Field()
    type: string;

    @IsOptional()
    @IsString()
    @Field({nullable: true})
    value?: string;

}

@InputType()
export class ProductDetailInp {
    @IsOptional()
    @Field(() => [ImageDetailInp], { nullable: true })
    imgDisplay?: ImageDetailInp[];

    @IsOptional()
    @Field(() => TagsDetailInp, { nullable: true })
    brand?: TagsDetailInp;

    @IsOptional()
    @Field(() => TagsDetailInp, { nullable: true })
    size?: TagsDetailInp;

    @IsOptional()
    sillage?: TagsDetailInp;

    @Field(() => TagsDetailInp, { nullable: true })
    longevity?: TagsDetailInp;

    @IsOptional()
    @Field(() => TagsDetailInp, { nullable: true })
    fragranceNotes?: TagsDetailInp;

    @IsOptional()
    @Field(() => TagsDetailInp, { nullable: true })
    concentration?: TagsDetailInp;

    @IsOptional()
    @Field(() => TagsDetailInp, { nullable: true })
    sex?: TagsDetailInp;

    @IsOptional()
    @Field({ nullable: true })
    description?: string;

    @IsOptional()
    @Field({ nullable: true })
    tutorial?: string
}

@InputType()
export class ImageDetailInp {

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    url?: string;

    @IsOptional()
    @Field(() => [String], { nullable: true })
    link?: string[];
}

@InputType()
export class CreateProductDto {
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    public userId?: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Float)
    originCost: number;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Float)
    displayCost: number;

    @IsNotEmpty()
    @IsNumber()
    @Field(() => Int)
    stockQuantity?: number;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    category?: string;

    @IsNotEmpty()
    @Field(() => ProductDetailInp)
    details: ProductDetailInp;
}
