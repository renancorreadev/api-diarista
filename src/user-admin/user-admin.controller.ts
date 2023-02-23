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
} from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@Controller('admin/users')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}

  @Get('index')
  @Render('users/index')
  async displayUsers() {
    return { name: 'Renan', email: 'test@test.com.br', id: '1' };
  }

  @Get('create')
  @Render('users/register')
  async displayUserRegister() {
    //
  }

  @Post()
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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAdminDto: UpdateUserAdminDto,
  ) {
    return this.userAdminService.update(+id, updateUserAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAdminService.remove(+id);
  }
}
