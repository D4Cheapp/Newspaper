import { PartialType } from '@nestjs/swagger';
import { CreatePrintingHouseDto } from './create-printing-house.dto';

export class UpdatePrintingHouseDto extends PartialType(CreatePrintingHouseDto) {}
