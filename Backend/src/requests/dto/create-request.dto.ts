import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRequestDto {
  @ApiProperty({ description: 'ID клиента', example: 1 })
  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ description: 'ID статуса заявки', example: 1 })
  @IsInt()
  @IsNotEmpty()
  statusId: number;

  @ApiProperty({ description: 'ID типа услуги', example: 1 })
  @IsInt()
  @IsNotEmpty()
  serviceTypeId: number;

  @ApiProperty({ description: 'Описание заявки', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
