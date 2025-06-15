import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PublicationStatus } from './publication-status.entity';

@Injectable()
export class PublicationStatusService {
  constructor(
    @InjectRepository(PublicationStatus)
    private readonly publicationStatusRepository: Repository<PublicationStatus>,
  ) {}

  async findAll(): Promise<PublicationStatus[]> {
    try {
      return await this.publicationStatusRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка статусов публикаций');
    }
  }

  async findOne(id: number): Promise<PublicationStatus> {
    const status = await this.publicationStatusRepository.findOne({ where: { id } });
    if (!status) {
      throw new InternalServerErrorException(`Статус публикации с ID ${id} не найден`);
    }
    return status;
  }
}
