import { UserAdminService } from './../user-admin/user-admin.service';
import { SessionSerialize } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAdmin } from 'src/user-admin/entities/user-admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserAdmin])],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerialize, UserAdminService],
})
export class AuthModule {}
