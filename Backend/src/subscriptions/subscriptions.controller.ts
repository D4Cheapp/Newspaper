import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription } from './subscription.entity';

@ApiTags('Подписки')
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую подписку', description: 'Создает новую запись о подписке клиента на издание' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Подписка успешно создана', type: Subscription })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Некорректные данные' })
  @ApiBody({ type: CreateSubscriptionDto, description: 'Данные для создания подписки' })
  create(@Body() createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все подписки', description: 'Возвращает список всех подписок' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Список подписок', type: [Subscription] })
  findAll(): Promise<Subscription[]> {
    return this.subscriptionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить подписку по ID', description: 'Возвращает информацию о подписке по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор подписки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Информация о подписке', type: Subscription })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Подписка не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Subscription> {
    return this.subscriptionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить подписку', description: 'Обновляет информацию о подписке' })
  @ApiParam({ name: 'id', description: 'Идентификатор подписки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Подписка успешно обновлена', type: Subscription })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Подписка не найдена' })
  @ApiBody({ type: UpdateSubscriptionDto, description: 'Данные для обновления подписки' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSubscriptionDto: UpdateSubscriptionDto,
  ): Promise<Subscription> {
    return this.subscriptionsService.update(id, updateSubscriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить подписку', description: 'Удаляет запись о подписке по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор подписки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Подписка успешно удалена' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Подписка не найдена' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.subscriptionsService.remove(id);
  }
}
