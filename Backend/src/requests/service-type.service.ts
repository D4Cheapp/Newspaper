import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from './service-type.entity';

@Injectable()
export class ServiceTypeService {
  constructor(
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
  ) {}

  async findAll(): Promise<ServiceType[]> {
    try {
      return await this.serviceTypeRepository.find({
        order: { name: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка типов услуг');
    }
  }

  async findOne(id: number): Promise<ServiceType> {
    const serviceType = await this.serviceTypeRepository.findOne({ where: { id } });
    if (!serviceType) {
      throw new InternalServerErrorException(`Тип услуги с ID ${id} не найден`);
    }
    return serviceType;
  }
}
