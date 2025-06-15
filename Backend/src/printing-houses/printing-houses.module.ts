import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PrintingHousesController } from './printing-houses.controller';
import { PrintingHousesService } from './printing-houses.service';
import { PrintingHouse } from './printing-house.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrintingHouse])],
  controllers: [PrintingHousesController],
  providers: [PrintingHousesService],
  exports: [PrintingHousesService],
})
export class PrintingHousesModule {}
