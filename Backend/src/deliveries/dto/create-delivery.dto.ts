import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsNotEmpty } from 'class-validator';

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

  @ApiProperty({ description: 'Количество экземпляров', example: 1 })
  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
