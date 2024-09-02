import { Field, InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TagsDetailInp } from "./createProduct.dto";

@InputType()
export class SearchProductDto {
    @IsNotEmpty()
    @IsString()
    @Field()
    name: string;

    @IsOptional() 
    @Field(() => [Number], { nullable: true })
    rangeMoney?: number[]

    @IsOptional() 
    @Field(()=>[TagsDetailInp], { nullable: true })
    size?: TagsDetailInp[];

    @IsOptional() 
    @Field(()=>[TagsDetailInp], { nullable: true })
    brand?: TagsDetailInp[];

    @IsOptional() 
    @Field(()=>[TagsDetailInp], { nullable: true })
    fragranceNotes?: TagsDetailInp[];

    @IsOptional() 
    @Field(()=>[TagsDetailInp], { nullable: true })
    concentration?: TagsDetailInp[];

    @IsOptional() 
    @Field(()=>[TagsDetailInp], { nullable: true })
    sex?: TagsDetailInp[];

}
