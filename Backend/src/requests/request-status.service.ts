import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RequestStatus } from './request-status.entity';

@Injectable()
export class RequestStatusService {
  constructor(
    @InjectRepository(RequestStatus)
    private readonly requestStatusRepository: Repository<RequestStatus>,
  ) {}

  async findAll(): Promise<RequestStatus[]> {
    try {
      return await this.requestStatusRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка статусов заявок');
    }
  }

  async findOne(id: number): Promise<RequestStatus> {
    const status = await this.requestStatusRepository.findOne({ where: { id } });
    if (!status) {
      throw new InternalServerErrorException(`Статус заявки с ID ${id} не найден`);
    }
    return status;
  }
}
