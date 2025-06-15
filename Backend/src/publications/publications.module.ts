import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsController } from './publications.controller';
import { PublicationStatusController } from './publication-status.controller';
import { PublicationTypeController } from './publication-type.controller';
import { PublicationsService } from './publications.service';
import { PublicationStatusService } from './publication-status.service';
import { PublicationTypeService } from './publication-type.service';
import { Publication } from './publication.entity';
import { PublicationType } from './publication-type.entity';
import { PublicationStatus } from './publication-status.entity';
import { PrintingHouse } from '../printing-houses/printing-house.entity';
import { Author } from '../authors/author.entity';
import { PublicationAuthor } from './publication-author.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Publication,
      PublicationType,
      PublicationStatus,
      PrintingHouse,
      Author,
      PublicationAuthor,
    ]),
  ],
  controllers: [
    PublicationsController, 
    PublicationStatusController, 
    PublicationTypeController
  ],
  providers: [
    PublicationsService, 
    PublicationStatusService, 
    PublicationTypeService
  ],
  exports: [
    PublicationsService, 
    PublicationStatusService,
    PublicationTypeService
  ],
})
export class PublicationsModule {}
