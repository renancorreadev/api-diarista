import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Redirect,
  UseFilters,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { CreateException } from 'src/common/filters/create-exception.filter';
import { PatchException } from 'src/common/filters/patch-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authentication.guard';
import { AuthException } from 'src/common/filters/auth-exceptions.filter';

@Controller('admin/users')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get('index')
  @Render('users/index')
  async displayUsers() {
    return { users: await this.userAdminService.findAll() };
  }
  e;
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @Get('create')
  @Render('users/register')
  async displayUserRegister(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(CreateException)
  @Post()
  @Redirect('/admin/users/index')
  create(@Body() createUserAdminDto: CreateUserAdminDto) {
    return this.userAdminService.create(createUserAdminDto);
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @UseFilters(CreateException)
  @Get(':id/edit')
  @Render('users/edit')
  async editUser(@Param('id') id: number, @Request() req) {
    const user = await this.userAdminService.findOne(id);
    return {
      user: user,
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthException)
  @UseFilters(PatchException)
  @Patch(':id/edit')
  @Redirect('/admin/users/index')
  async update(
    @Param('id') id: number,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ) {
    return await this.userAdminService.update(id, updateUserAdminDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  @Redirect('/admin/users/index')
  remove(@Param('id') id: number) {
    return this.userAdminService.remove(id);
  }
}
