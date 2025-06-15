import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PublicationType } from './publication-type.entity';
import { PublicationTypeService } from './publication-type.service';

@ApiTags('Типы публикаций')
@Controller('publication-types')
export class PublicationTypeController {
  constructor(private readonly publicationTypeService: PublicationTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все типы публикаций' })
  @ApiResponse({ status: 200, description: 'Список типов публикаций', type: [PublicationType] })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  async findAll(): Promise<PublicationType[]> {
    return this.publicationTypeService.findAll();
  }
}
