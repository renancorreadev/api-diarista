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

  async findAll() {
    return await this.userRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} userAdmin`;
  }

  async update(id: number, updateUserAdminDto: UpdateUserAdminDto) {
    const userId = await this.userRepository.findOneBy({ id: id });
    const userEmail = await this.userRepository.findOneBy({
      email: updateUserAdminDto.email,
    });

    if (
      updateUserAdminDto.password !== updateUserAdminDto.passwordConfirmation
    ) {
      throw new Error('Senhas dos campos não conferem');
    } else if (!userEmail || userEmail.email === userId.email) {
      userId.name = updateUserAdminDto.name;
      userId.email = updateUserAdminDto.email;
      userId.password = await this.setPassword(updateUserAdminDto.password);

      await this.userRepository.save(userId);

      return userId;
    } else if (userEmail.email !== userId.email) {
      throw new BadRequestException('Email já cadastrado! Use outro e-mail.');
    }
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
