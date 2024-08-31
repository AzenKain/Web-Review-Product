import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

@InputType()
export class updateOrderDto {
  @IsOptional()
  @IsString()
  @Field()
  public userId?: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Field(() => ID)
  orderId: number;

  @IsOptional()
  @IsString()
  @Field()
  public status?: string;

  @IsOptional()
  @Field()
  public isPaid?: boolean;

}
