/* eslint-disable prettier/prettier */
import { ApiProperty } from "@nestjs/swagger";

/* eslint-disable prettier/prettier */
export class AuthEntity{
    @ApiProperty()
    accessToken:string;
}