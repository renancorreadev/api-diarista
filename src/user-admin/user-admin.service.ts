import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserAdminDto } from './dto/create-user-admin.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin.dto';
import { UserAdmin } from './entities/user-admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserAdminService {
  constructor(
    @InjectRepository(UserAdmin)
    private userRepository: Repository<UserAdmin>,
  ) {}

  async create(createUserAdminDto: CreateUserAdminDto) {
    const user = await this.userRepository.findOneBy({
      email: createUserAdminDto.email,
    });

    if (
      createUserAdminDto.password !== createUserAdminDto.passwordConfirmation
    ) {
      throw new Error('Senhas dos campos não conferem');
    } else if (!user) {
      createUserAdminDto.password = await this.setPassword(
        createUserAdminDto.password,
      );

      return this.userRepository.save(createUserAdminDto);
    }

    throw new BadRequestException('Email já cadastrado');
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

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
  }
}
