import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class SearchOrderDto {
    @IsOptional()
    @Field(() => ID, {nullable: true})
    orderId?: number;

    @IsOptional()
    @IsString()
    @Field({nullable: true})
    email?: string;

    @IsOptional()
    @IsString()
    @Field({nullable: true})
    firstName?: string;

    @IsOptional()
    @IsString()
    @Field({nullable: true})
    lastName?: string;

    @IsOptional()
    @IsString()
    @Field({nullable: true})
    phoneNumber?: string;

}
