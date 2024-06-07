/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/users/users.service";
import { jwtSecret } from "./auth.module";

/* eslint-disable prettier/prettier */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(private userService:UsersService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload:{userId:number}){
        const user= await this.userService.findOne(payload.userId);
        if(!user){
            throw new UnauthorizedException();
        }
        return user;
    }

}