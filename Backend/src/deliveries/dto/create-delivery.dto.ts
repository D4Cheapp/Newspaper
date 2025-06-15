import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty({ description: 'ID клиента', example: 1 })
  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ description: 'ID публикации', example: 1 })
  @IsInt()
  @IsNotEmpty()
  publicationId: number;

  @ApiProperty({ description: 'ID статуса доставки', example: 1 })
  @IsInt()
  @IsNotEmpty()
  statusId: number;

  @ApiProperty({ description: 'Адрес доставки', example: 'г. Москва, ул. Примерная, д. 10, кв. 5' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Дата доставки (ГГГГ-ММ-ДД)', example: '2024-12-31' })
  @IsDateString()
  @IsNotEmpty()
  deliveryDate: string;

  @ApiProperty({ description: 'Комментарий к доставке', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
