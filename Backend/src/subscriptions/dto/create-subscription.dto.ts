import { ApiProperty } from '@nestjs/swagger';

import { IsDateString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'ID клиента', example: 1 })
  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ description: 'ID типа публикации', example: 1 })
  @IsInt()
  @IsNotEmpty()
  publicationTypeId: number;

  @ApiProperty({ description: 'Дата окончания подписки (ГГГГ-ММ-ДД)', example: '2024-12-31' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;
}
