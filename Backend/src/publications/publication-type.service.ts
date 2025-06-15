import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicationType } from './publication-type.entity';

@Injectable()
export class PublicationTypeService {
  constructor(
    @InjectRepository(PublicationType)
    private readonly publicationTypeRepository: Repository<PublicationType>,
  ) {}

  async findAll(): Promise<PublicationType[]> {
    try {
      return await this.publicationTypeRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка типов публикаций');
    }
  }

  async findOne(id: number): Promise<PublicationType> {
    const type = await this.publicationTypeRepository.findOne({ where: { id } });
    if (!type) {
      throw new InternalServerErrorException(`Тип публикации с ID ${id} не найден`);
    }
    return type;
  }
}
