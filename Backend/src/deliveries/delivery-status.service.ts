import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeliveryStatus } from './delivery-status.entity';

@Injectable()
export class DeliveryStatusService {
  constructor(
    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
  ) {}

  async findAll(): Promise<DeliveryStatus[]> {
    try {
      return await this.deliveryStatusRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка статусов доставки');
    }
  }

  async findOne(id: number): Promise<DeliveryStatus> {
    const status = await this.deliveryStatusRepository.findOne({ where: { id } });
    if (!status) {
      throw new InternalServerErrorException(`Статус доставки с ID ${id} не найден`);
    }
    return status;
  }
}
