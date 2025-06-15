import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PrintingHousesService } from './printing-houses.service';
import { CreatePrintingHouseDto } from './dto/create-printing-house.dto';
import { UpdatePrintingHouseDto } from './dto/update-printing-house.dto';
import { PrintingHouse } from './printing-house.entity';

@ApiTags('Типографии')
@Controller('printing-houses')
export class PrintingHousesController {
  constructor(private readonly printingHousesService: PrintingHousesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую типографию' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Типография успешно создана', type: PrintingHouse })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Неверные входные данные' })
  @ApiBody({ type: CreatePrintingHouseDto })
  create(@Body() createDto: CreatePrintingHouseDto) {
    return this.printingHousesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех типографий' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Список типографий успешно получен', type: [PrintingHouse] })
  findAll() {
    return this.printingHousesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить типографию по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID типографии' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Типография найдена', type: PrintingHouse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Типография не найдена' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.printingHousesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить данные типографии' })
  @ApiParam({ name: 'id', type: Number, description: 'ID типографии' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Данные типографии успешно обновлены', type: PrintingHouse })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Типография не найдена' })
  @ApiBody({ type: UpdatePrintingHouseDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDto: UpdatePrintingHouseDto,
  ) {
    return this.printingHousesService.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить типографию' })
  @ApiParam({ name: 'id', type: Number, description: 'ID типографии' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Типография успешно удалена' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Типография не найдена' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.printingHousesService.remove(id);
  }
}
