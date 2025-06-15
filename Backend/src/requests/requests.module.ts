import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { Request } from './request.entity';
import { RequestStatus } from './request-status.entity';
import { ServiceType } from './service-type.entity';
import { Client } from '../clients/client.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Request,
      RequestStatus,
      ServiceType,
      Client
    ])
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
  exports: [RequestsService]
})
export class RequestsModule {}
