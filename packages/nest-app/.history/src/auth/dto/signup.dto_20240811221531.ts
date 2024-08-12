import { Field, InputType } from "@nestjs/graphql";
import {IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

@InputType()
export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @Field()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    password: string;

    @IsString()
    @IsNotEmpty()
    @Field()
    @Field()
    firstName: string;

    @Field()
    lastName: string;

}