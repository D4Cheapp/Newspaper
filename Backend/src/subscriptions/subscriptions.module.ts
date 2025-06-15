import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './subscription.entity';
import { Client } from '../clients/client.entity';
import { PublicationType } from '../publications/publication-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subscription,
      Client,
      PublicationType
    ])
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService]
})
export class SubscriptionsModule {}
