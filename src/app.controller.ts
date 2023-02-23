import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseFilters,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthException } from './common/filters/auth-exceptions.filter';
import { LoginGuard } from './common/guards/login.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('admin/login')
  @Render('login')
  getLogin(@Request() req) {
    return {
      layout: false,
      loginError: req.flash('loginError'),
      class: req.flash('class'),
    };
  }

  @UseFilters(AuthException)
  @UseGuards(LoginGuard)
  @Post('admin/login')
  @Redirect('/admin/users/index')
  doLogin() {
    //
  }
}
