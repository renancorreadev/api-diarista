import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      type: 'mysql',
      synchronize: false,
      entities: [join(__dirname, '..', '**type/*entity.{ts, js}')],
      migrations: [join(__dirname, '..', '**type/*migrations.{ts, js}')],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
