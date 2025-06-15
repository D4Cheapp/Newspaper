import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './subscription.entity';
import { Client } from '../clients/client.entity';
import { Publication } from '../publications/publication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subscription,
      Client,
      Publication
    ])
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService]
})
export class SubscriptionsModule {}
