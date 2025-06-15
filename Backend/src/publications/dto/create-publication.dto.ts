import { ApiProperty } from '@nestjs/swagger';

import { IsArray, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePublicationDto {
  @ApiProperty({ example: 'Газета "Экономика сегодня"', description: 'Название издания' })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Ежедневная газета о последних новостях экономики',
    description: 'Краткое описание издания',
  })
  @IsString()
  description: string;

  @ApiProperty({ example: 150, description: 'Цена за единицу издания' })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 1, description: 'ID типа издания' })
  @IsInt()
  typeId: number;

  @ApiProperty({ example: 1, description: 'ID статуса издания' })
  @IsInt()
  statusId: number;

  @ApiProperty({ example: 1, description: 'ID типографии' })
  @IsInt()
  printingHouseId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'ID авторов издания',
    type: [Number],
    required: false,
  })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  authorIds?: number[];
}
