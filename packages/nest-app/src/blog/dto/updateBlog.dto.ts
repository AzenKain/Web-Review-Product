import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

@InputType()
export class UpdateBlogDto {
    @IsNotEmpty()
    @IsNumber()
    @Field(() => ID)
    blogId: number;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    title?: string;

    @IsOptional()
    @IsString()
    @Field({ nullable: true })
    typeBlog?: string;

    @IsOptional()
    @IsString()
    @Field()
    content?: string;
}