import { InputType, Field, ID } from "@nestjs/graphql";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

@InputType()
export class SearchBlogDto {
    @IsOptional()
    @IsNumber()
    @Field(() => ID, { nullable: true })
    blogId?: number;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    title?: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    typeBlog?: string;
}