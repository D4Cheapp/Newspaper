import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Request } from './request.entity';

@ApiTags('Заявки')
@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую заявку', description: 'Создает новую заявку на услугу' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Заявка успешно создана', type: Request })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Некорректные данные' })
  @ApiBody({ type: CreateRequestDto, description: 'Данные для создания заявки' })
  create(@Body() createRequestDto: CreateRequestDto): Promise<Request> {
    return this.requestsService.create(createRequestDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все заявки', description: 'Возвращает список всех заявок' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Список заявок', type: [Request] })
  findAll(): Promise<Request[]> {
    return this.requestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заявку по ID', description: 'Возвращает информацию о заявке по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор заявки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Информация о заявке', type: Request })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Заявка не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Request> {
    return this.requestsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить заявку', description: 'Обновляет информацию о заявке' })
  @ApiParam({ name: 'id', description: 'Идентификатор заявки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Заявка успешно обновлена', type: Request })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Заявка не найдена' })
  @ApiBody({ type: UpdateRequestDto, description: 'Данные для обновления заявки' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRequestDto: UpdateRequestDto,
  ): Promise<Request> {
    return this.requestsService.update(id, updateRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить заявку', description: 'Удаляет заявку по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор заявки', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Заявка успешно удалена' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Заявка не найдена' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.requestsService.remove(id);
  }
}
