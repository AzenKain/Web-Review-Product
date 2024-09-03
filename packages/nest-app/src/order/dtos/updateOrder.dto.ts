import { Field, ID, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

@InputType()
export class updateOrderDto {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  userId?: string;
  
  @IsNotEmpty()
  @IsNumber()
  @Field(() => ID)
  orderId: number;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  status?: string;

  @IsOptional()
  @Field({ nullable: true })
  isPaid?: boolean;

}
