/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MinLength, IsOptional, MaxLength, IsBoolean } from "class-validator";

/* eslint-disable prettier/prettier */
export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty()
    title:string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(300)
    @ApiProperty({
      required: false,
    })
    description:string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    body:string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
      required: false,
      default:false
    })
    published?:boolean=false;
}
