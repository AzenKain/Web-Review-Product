import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString, IsNotEmpty,IsOptional, IsNumber } from "class-validator";

@InputType()
export class DeleteProductDto {
  @IsNotEmpty()
  @IsNumber()
  @Field(() => ID)
  public productId : number;

  @IsOptional()
  @IsString()
  @Field()
  public userId?: string;
}