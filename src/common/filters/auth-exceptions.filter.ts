import {
  ArgumentsHost,
  Catch,
  HttpException,
  ExceptionFilter,
  BadRequestException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';

import { Response } from 'express';

@Catch(HttpException)
export class AuthException implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    /** if erros throws new error */
    if (
      exception instanceof BadRequestException ||
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      request.flash('loginError', 'Login ou Senha inválidas.');
      request.flash('class', 'is-invalid');
      response.redirect('/admin/login');
    } else {
      response.redirect('/404');
    }
  }
}
