import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { PublicationStatus } from './publication-status.entity';
import { PublicationStatusService } from './publication-status.service';

@ApiTags('Статусы публикаций')
@Controller('publication-statuses')
export class PublicationStatusController {
  constructor(private readonly publicationStatusService: PublicationStatusService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все статусы публикаций' })
  @ApiResponse({
    status: 200,
    description: 'Список статусов публикаций',
    type: [PublicationStatus],
  })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  async findAll(): Promise<PublicationStatus[]> {
    return this.publicationStatusService.findAll();
  }
}
