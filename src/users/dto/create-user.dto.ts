/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email:string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty()
    password:string;
}
