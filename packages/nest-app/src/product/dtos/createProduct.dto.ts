import { Field, Float, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

@InputType()
export class ProductDetailInp {
    @IsOptional() 
    @Field(() => [ImageDetailInp])
    imgDisplay?: ImageDetailInp[];

    @IsOptional() 
    @IsString()
    @Field()
    size?: string;

    @IsOptional() 
    @IsString()
    @Field()
    brand?: string;

    @IsOptional() 
    @Field(() => [String], { nullable: true })
    tags?: string[];

    @IsOptional() 
    @Field(() => [String], { nullable: true })
    fragranceNotes?: string[];

    @IsOptional() 
    @Field({ nullable: true })
    description?: string;
}

@InputType()
export class ImageDetailInp {

    @IsOptional() 
    @IsString()
    @Field()
    url?: string;

    @IsOptional() 
    @Field(() => [String], { nullable: true })
    link?: string[];
}

@InputType()
export class CreateProductDto {
  @IsOptional()
  @IsString()
  @Field()
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
  stockQuantity: number;

  @IsNotEmpty()
  @IsString()
  @Field()
  category: string;

  @IsNotEmpty()
  @Field(() => ProductDetailInp)
  details: ProductDetailInp;
}
