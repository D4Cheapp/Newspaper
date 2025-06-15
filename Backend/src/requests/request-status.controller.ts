import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { RequestStatus } from './request-status.entity';
import { RequestStatusService } from './request-status.service';

@ApiTags('Статусы заявок')
@Controller('request-statuses')
export class RequestStatusController {
  constructor(private readonly requestStatusService: RequestStatusService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все статусы заявок' })
  @ApiResponse({ status: 200, description: 'Список статусов заявок', type: [RequestStatus] })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  async findAll(): Promise<RequestStatus[]> {
    return this.requestStatusService.findAll();
  }
}
