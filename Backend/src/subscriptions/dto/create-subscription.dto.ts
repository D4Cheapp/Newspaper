import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ description: 'ID клиента', example: 1 })
  @IsInt()
  @IsNotEmpty()
  clientId: number;

  @ApiProperty({ description: 'ID публикации', example: 1 })
  @IsInt()
  @IsNotEmpty()
  publicationId: number;

  @ApiProperty({ description: 'Дата окончания подписки (ГГГГ-ММ-ДД)', example: '2024-12-31' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ description: 'Комментарий к подписке', required: false })
  @IsString()
  @IsOptional()
  comment?: string;
}
