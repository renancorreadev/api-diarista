import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      database: 'ediarista',
      username: 'root',
      password: 'Astro119',
      host: '127.0.0.1',
      port: 3306,
      type: 'mysql',
      synchronize: false,
      entities: [join(__dirname, '..', '**/*entity.{ts,js}')],
      migrations: [join(__dirname, '..', './database/migrations/*{ts,js}')],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
