import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AuthorsModule } from './authors/authors.module';
import { ClientsModule } from './clients/clients.module';
import { PrintingHousesModule } from './printing-houses/printing-houses.module';
import { PublicationsModule } from './publications/publications.module';
import { RequestsModule } from './requests/requests.module';
import { SubscriptionsModule } from './subscriptions/subscriptions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      entities: [],
      synchronize: false,
      autoLoadEntities: true,
    }),
    AuthorsModule,
    ClientsModule,
    PrintingHousesModule,
    PublicationsModule,
    RequestsModule,
    SubscriptionsModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
