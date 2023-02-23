import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './database/typeorm-config';
import { ConfigModule } from '@nestjs/config';

import { ServicosModule } from './servicos/servicos.module';
import { UserAdminModule } from './user-admin/user-admin.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot(),
    ServicosModule,
    UserAdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
