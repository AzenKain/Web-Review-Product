import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ProductDetailInp } from "./createProduct.dto";

@InputType()
export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => ID)
  public productId: number;

  @IsOptional()
  @IsString()
  @Field()
  public userId?: string;

  @IsOptional()
  @IsString()
  @Field()
  name?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Float)
  originCost?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float)
  displayCost?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int)
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  @Field()
  category?: string;

  @IsOptional() 
  @IsNumber()
  @Field({ nullable: true, defaultValue: 0 })
  buyCount?: number;

  @IsOptional() 
  @IsNumber()
  @Field(() => Float, { nullable: true, defaultValue: 0 })
  rating?: number;

  @IsOptional()
  @Field(() => ProductDetailInp)
  details?: ProductDetailInp;
}
