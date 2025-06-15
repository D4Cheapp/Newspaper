import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ServiceType } from './service-type.entity';
import { ServiceTypeService } from './service-type.service';

@ApiTags('Типы услуг')
@Controller('service-types')
export class ServiceTypeController {
  constructor(private readonly serviceTypeService: ServiceTypeService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все типы услуг' })
  @ApiResponse({ status: 200, description: 'Список типов услуг', type: [ServiceType] })
  @ApiResponse({ status: 500, description: 'Ошибка сервера' })
  async findAll(): Promise<ServiceType[]> {
    return this.serviceTypeService.findAll();
  }
}
