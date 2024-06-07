/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { Passport } from 'passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

export const jwtSecret='nestjsprisma';

@Module({
  imports:[PrismaModule,Passport,JwtModule.register({
    secret: jwtSecret,
    signOptions: {expiresIn:'5m'},
  }),UsersModule],
  controllers:[AuthController],
  providers:[AuthService,JwtStrategy]
})
export class AuthModule {

}
