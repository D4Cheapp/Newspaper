import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeliveriesController } from './deliveries.controller';
import { DeliveryStatusController } from './delivery-status.controller';
import { DeliveriesService } from './deliveries.service';
import { DeliveryStatusService } from './delivery-status.service';
import { Delivery } from './delivery.entity';
import { DeliveryStatus } from './delivery-status.entity';
import { Client } from '../clients/client.entity';
import { Publication } from '../publications/publication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Delivery,
      DeliveryStatus,
      Client,
      Publication
    ])
  ],
  controllers: [DeliveriesController, DeliveryStatusController],
  providers: [DeliveriesService, DeliveryStatusService],
  exports: [DeliveriesService, DeliveryStatusService]
})
export class DeliveriesModule {}
