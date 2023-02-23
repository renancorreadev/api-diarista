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
} from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { CreateException } from 'src/common/filters/create-exception.filter';
import { PatchException } from 'src/common/filters/patch-exceptions.filter';

@Controller('admin/users')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}

  @Get('index')
  @Render('users/index')
  async displayUsers() {
    return { users: await this.userAdminService.findAll() };
  }

  @Get('create')
  @Render('users/register')
  async displayUserRegister(@Request() req) {
    return {
      message: req.flash('message'),
      oldData: req.flash('oldData'),
      alert: req.flash('alert'),
    };
  }

  @Post()
  @UseFilters(CreateException)
  @Redirect('/admin/users/index')
  create(@Body() createUserAdminDto: CreateUserAdminDto) {
    return this.userAdminService.create(createUserAdminDto);
  }

  @Get()
  findAll() {
    return this.userAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAdminService.findOne(+id);
  }

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

  @Patch(':id/edit')
  @UseFilters(PatchException)
  @Redirect('/admin/users/index')
  async update(
    @Param('id') id: number,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ) {
    return await this.userAdminService.update(id, updateUserAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAdminService.remove(+id);
  }
}
