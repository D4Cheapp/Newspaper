import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { DeliveryStatus } from './delivery-status.entity';
import { DeliveryStatusService } from './delivery-status.service';

@ApiTags('Статусы доставки')
@Controller('delivery-statuses')
export class DeliveryStatusController {
  constructor(private readonly deliveryStatusService: DeliveryStatusService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все статусы доставки' })
  @ApiResponse({ status: 200, description: 'Список статусов доставки', type: [DeliveryStatus] })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  async findAll(): Promise<DeliveryStatus[]> {
    return this.deliveryStatusService.findAll();
  }
}
