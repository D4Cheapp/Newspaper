import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './publication.entity';

@ApiTags('Публикации')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую публикацию', description: 'Создает новую публикацию с указанными параметрами' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Публикация успешно создана', type: Publication })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Некорректные данные' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Связанные сущности не найдены' })
  @ApiBody({ type: CreatePublicationDto, description: 'Данные для создания публикации' })
  create(@Body() createPublicationDto: CreatePublicationDto): Promise<Publication> {
    return this.publicationsService.create(createPublicationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить все публикации', description: 'Возвращает список всех публикаций с информацией об авторах' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Список публикаций', type: [Publication] })
  findAll(): Promise<Publication[]> {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить публикацию по ID', description: 'Возвращает информацию о публикации по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор публикации', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Информация о публикации', type: Publication })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Публикация не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Publication> {
    return this.publicationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить публикацию', description: 'Обновляет информацию о публикации' })
  @ApiParam({ name: 'id', description: 'Идентификатор публикации', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Публикация успешно обновлена', type: Publication })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Публикация или связанные сущности не найдены' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Некорректные данные' })
  @ApiBody({ type: UpdatePublicationDto, description: 'Данные для обновления публикации' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublicationDto: UpdatePublicationDto,
  ): Promise<Publication> {
    return this.publicationsService.update(id, updatePublicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить публикацию', description: 'Удаляет публикацию по её идентификатору' })
  @ApiParam({ name: 'id', description: 'Идентификатор публикации', type: Number })
  @ApiResponse({ status: HttpStatus.OK, description: 'Публикация успешно удалена' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Публикация не найдена' })
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.publicationsService.remove(id);
  }
}
