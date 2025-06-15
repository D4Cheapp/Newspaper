import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePrintingHouseDto {
  @ApiProperty({ example: 'BestPrint Ltd', description: 'Name of the printing house' })
  @IsString()
  name: string;

  @ApiProperty({ example: '123 Main St, NY', description: 'Address' })
  @IsString()
  address: string;
}
