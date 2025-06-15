import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Delivery } from './delivery.entity';

@ApiTags('Доставки')
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую доставку', description: 'Создает новую запись о доставке издания клиенту' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Доставка успешно создана', type: Delivery })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Некорректные данные' })
  @ApiBody({ type: CreateDeliveryDto, description: 'Данные для создания доставки' })
  create(@Body() createDeliveryDto: CreateDeliveryDto): Promise<Delivery> {
    return this.deliveriesService.create(createDeliveryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все доставки', description: 'Возвращает список всех доставок' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Список доставок', type: [Delivery] })
  findAll(): Promise<Delivery[]> {
    return this.deliveriesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить доставку по ID', description: 'Возвращает информацию о доставке по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор доставки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Информация о доставке', type: Delivery })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Доставка не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Delivery> {
    return this.deliveriesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить доставку', description: 'Обновляет информацию о доставке' })
  @ApiParam({ name: 'id', description: 'Идентификатор доставки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Доставка успешно обновлена', type: Delivery })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Доставка не найдена' })
  @ApiBody({ type: UpdateDeliveryDto, description: 'Данные для обновления доставки' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDeliveryDto: UpdateDeliveryDto,
  ): Promise<Delivery> {
    return this.deliveriesService.update(id, updateDeliveryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить доставку', description: 'Удаляет запись о доставке по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор доставки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Доставка успешно удалена' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Доставка не найдена' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.deliveriesService.remove(id);
  }
}
