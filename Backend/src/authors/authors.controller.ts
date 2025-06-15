import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@ApiTags('Авторы')
@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  @ApiOperation({ summary: 'Создание автора' })
  create(@Body() createDto: CreateAuthorDto) {
    return this.authorsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение всех авторов' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение автора по id' })
  findOne(@Param('id') id: string) {
    return this.authorsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновление автора' })
  update(@Param('id') id: string, @Body() updateDto: UpdateAuthorDto) {
    return this.authorsService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление автора' })
  remove(@Param('id') id: string) {
    return this.authorsService.remove(+id);
  }
}
