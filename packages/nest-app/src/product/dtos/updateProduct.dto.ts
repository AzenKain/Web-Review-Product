import { Field, Float, ID, InputType, Int } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import { ProductDetailInp } from "./createProduct.dto";

@InputType()
export class UpdateProductDto {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => ID)
  productId: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  name?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  originCost?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  displayCost?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  stockQuantity?: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  category?: string;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, { nullable: true })
  buyCount?: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Float, { nullable: true })
  rating?: number;

  @IsOptional()
  @Field(() => ProductDetailInp, { nullable: true })
  details?: ProductDetailInp;
}
