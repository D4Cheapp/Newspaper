import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './client.entity';

@ApiTags('Клиенты')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать нового клиента' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Клиент успешно создан', type: Client })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Неверные входные данные' })
  @ApiBody({ type: CreateClientDto })
  create(@Body() createDto: CreateClientDto) {
    return this.clientsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех клиентов' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Список клиентов успешно получен', type: [Client] })
  findAll() {
    return this.clientsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить клиента по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID клиента' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Клиент найден', type: Client })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Клиент не найден' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные клиента' })
  @ApiParam({ name: 'id', type: Number, description: 'ID клиента' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Данные клиента успешно обновлены', type: Client })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Клиент не найден' })
  @ApiBody({ type: UpdateClientDto })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDto: UpdateClientDto) {
    return this.clientsService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить клиента' })
  @ApiParam({ name: 'id', type: Number, description: 'ID клиента' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Клиент успешно удален' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Клиент не найден' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.clientsService.remove(id);
  }
}
