import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { forwardRef } from '@nestjs/common';

import { Author } from '../authors/author.entity';
import { DeliveriesModule } from '../deliveries/deliveries.module';
import { PrintingHouse } from '../printing-houses/printing-house.entity';
import { SubscriptionsModule } from '../subscriptions/subscriptions.module';
import { PublicationAuthor } from './publication-author.entity';
import { PublicationStatusController } from './publication-status.controller';
import { PublicationStatus } from './publication-status.entity';
import { PublicationStatusService } from './publication-status.service';
import { PublicationTypeController } from './publication-type.controller';
import { PublicationType } from './publication-type.entity';
import { PublicationTypeService } from './publication-type.service';
import { Publication } from './publication.entity';
import { PublicationsController } from './publications.controller';
import { PublicationsService } from './publications.service';
import { ClientsModule } from '../clients/clients.module';
import { Client } from '../clients/client.entity';
import { Delivery } from '../deliveries/delivery.entity';
import { DeliveryStatus } from '../deliveries/delivery-status.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Publication,
      PublicationType,
      PublicationStatus,
      PrintingHouse,
      Author,
      PublicationAuthor,
      Client,
      Delivery,
      DeliveryStatus,
    ]),
    forwardRef(() => SubscriptionsModule),
    forwardRef(() => DeliveriesModule),
    forwardRef(() => ClientsModule),
  ],
  controllers: [PublicationsController, PublicationStatusController, PublicationTypeController],
  providers: [PublicationsService, PublicationStatusService, PublicationTypeService],
  exports: [PublicationsService],
})
export class PublicationsModule {}
