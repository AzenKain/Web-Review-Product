import { Field, InputType } from "@nestjs/graphql";
import {IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

}