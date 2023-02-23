import { Module } from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { UserAdminController } from './user-admin.controller';

@Module({
  controllers: [UserAdminController],
  providers: [UserAdminService]
})
export class UserAdminModule {}
