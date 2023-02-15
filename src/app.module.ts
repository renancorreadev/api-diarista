import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmConfigService } from './database/typeorm-config';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ServicosModule } from './servicos/servicos.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ConfigModule.forRoot(),
    UsersModule,
    ServicosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
