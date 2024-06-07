/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password:string;
}