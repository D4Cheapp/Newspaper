import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrintingHouse } from './printing-house.entity';
import { CreatePrintingHouseDto } from './dto/create-printing-house.dto';
import { UpdatePrintingHouseDto } from './dto/update-printing-house.dto';

@Injectable()
export class PrintingHousesService {
  constructor(
    @InjectRepository(PrintingHouse)
    private readonly printingHouseRepository: Repository<PrintingHouse>,
  ) {}

  async create(createDto: CreatePrintingHouseDto): Promise<PrintingHouse> {
    try {
      const printingHouse = this.printingHouseRepository.create(createDto);
      return await this.printingHouseRepository.save(printingHouse);
    } catch (error) {
      if (error.code === '23505') { // Нарушение уникальности
        throw new ConflictException('Типография с таким названием уже существует');
      }
      throw new InternalServerErrorException('Ошибка при создании типографии');
    }
  }

  async findAll(): Promise<PrintingHouse[]> {
    try {
      return await this.printingHouseRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка типографий');
    }
  }

  async findOne(id: number): Promise<PrintingHouse> {
    const printingHouse = await this.printingHouseRepository.findOne({ where: { id } });
    if (!printingHouse) {
      throw new NotFoundException(`Типография с ID ${id} не найдена`);
    }
    return printingHouse;
  }

  async update(id: number, updateDto: UpdatePrintingHouseDto): Promise<PrintingHouse> {
    const printingHouse = await this.findOne(id);
    
    try {
      Object.assign(printingHouse, updateDto);
      return await this.printingHouseRepository.save(printingHouse);
    } catch (error) {
      if (error.code === '23505') { // Нарушение уникальности
        throw new ConflictException('Типография с таким названием уже существует');
      }
      throw new InternalServerErrorException('Ошибка при обновлении данных типографии');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.printingHouseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Типография с ID ${id} не найдена`);
    }
  }
}
