/* eslint-disable prettier/prettier */
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.log(exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message.replace(/\n/g,'');

    switch(exception.code){
      case 'P002':{
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode:status,
          message:message
        });
        break;
      }
      case 'P2025':{
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode:status,
          message:message
        });
        break;
      }
      default:
        super.catch(exception,host);
        break;
    }
    
  }
}
