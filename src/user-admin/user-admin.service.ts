import { Injectable } from '@nestjs/common';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';

@Injectable()
export class UserAdminService {
  create(createUserAdminDto: CreateUserAdminDto) {
    return 'This action adds a new userAdmin';
  }

  findAll() {
    return `This action returns all userAdmin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAdmin`;
  }

  update(id: number, updateUserAdminDto: UpdateUserAdminDto) {
    return `This action updates a #${id} userAdmin`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAdmin`;
  }
}
