import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsController } from './requests.controller';
import { RequestStatusController } from './request-status.controller';
import { ServiceTypeController } from './service-type.controller';
import { RequestsService } from './requests.service';
import { RequestStatusService } from './request-status.service';
import { ServiceTypeService } from './service-type.service';
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
  controllers: [
    RequestsController, 
    RequestStatusController,
    ServiceTypeController
  ],
  providers: [
    RequestsService, 
    RequestStatusService,
    ServiceTypeService
  ],
  exports: [
    RequestsService, 
    RequestStatusService,
    ServiceTypeService
  ]
})
export class RequestsModule {}
