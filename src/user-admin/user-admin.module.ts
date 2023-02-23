import { Module } from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { UserAdminController } from './user-admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdmin } from './entities/user-admin.entity';
import { Utils } from 'src/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UserAdmin])],
  controllers: [UserAdminController],
  providers: [UserAdminService, Utils],
})
export class UserAdminModule {}
