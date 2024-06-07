/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { AuthEntity } from './entity/auth.entity';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService:JwtService
    ){}

    async login(email:string, password:string):Promise<AuthEntity>{
        const user = await this.prisma.user.findUnique({where:{email:email}});
        if(!user){
            throw new NotFoundException('email not found');
        }
        const isPasswordValid = await bcrypt.compare( password,user.password);
        if(!isPasswordValid){
            throw new UnauthorizedException('not valid');
        }
        return {
            accessToken:this.jwtService.sign({userId:user.id})
        }
    }



}
