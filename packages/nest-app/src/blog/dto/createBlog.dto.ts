import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class CreateBlogDto {
    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    userId?: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    title: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    typeBlog: string;

    @IsNotEmpty()
    @IsString()
    @Field()
    content: string;
}