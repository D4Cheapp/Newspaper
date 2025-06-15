import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request } from './request.entity';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { Client } from '../clients/client.entity';
import { RequestStatus } from './request-status.entity';
import { ServiceType } from './service-type.entity';

type RequestWithRelations = Request & {
  client: Client;
  requestStatus: RequestStatus;
  serviceType: ServiceType;
};

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private readonly requestRepository: Repository<Request>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(RequestStatus)
    private readonly statusRepository: Repository<RequestStatus>,
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
  ) {}

  async create(createDto: CreateRequestDto): Promise<RequestWithRelations> {
    const { clientId, statusId, serviceTypeId, ...requestData } = createDto;

    const [client, status, serviceType] = await Promise.all([
      this.clientRepository.findOne({ where: { id: clientId } }),
      this.statusRepository.findOne({ where: { id: statusId } }),
      this.serviceTypeRepository.findOne({ where: { id: serviceTypeId } }),
    ]);

    if (!client) {
      throw new NotFoundException(`Клиент с ID ${clientId} не найден`);
    }
    if (!status) {
      throw new NotFoundException(`Статус заявки с ID ${statusId} не найден`);
    }
    if (!serviceType) {
      throw new NotFoundException(`Тип услуги с ID ${serviceTypeId} не найден`);
    }

    try {
      const request = this.requestRepository.create({
        ...requestData,
        client: { id: clientId },
        status: { id: statusId },
        serviceType: { id: serviceTypeId },
      });

      const savedRequest = await this.requestRepository.save(request);
      return this.findOne(savedRequest.id);
    } catch (error) {
      throw new InternalServerErrorException('Не удалось создать заявку');
    }
  }

  async findAll(): Promise<RequestWithRelations[]> {
    try {
      return await this.requestRepository.find({
        relations: ['client', 'status', 'serviceType']
      }) as RequestWithRelations[];
    } catch (error) {
      throw new InternalServerErrorException('Не удалось загрузить список заявок');
    }
  }

  async findOne(id: number): Promise<RequestWithRelations> {
    const request = await this.requestRepository.findOne({
      where: { id },
      relations: ['client', 'status', 'serviceType']
    });

    if (!request) {
      throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    }

    return request as RequestWithRelations;
  }

  async update(id: number, updateDto: UpdateRequestDto): Promise<RequestWithRelations> {
    const request = await this.requestRepository.findOne({ 
      where: { id },
      relations: ['client', 'status', 'serviceType']
    });

    if (!request) {
      throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    }

    if (updateDto.clientId) {
      const client = await this.clientRepository.findOne({ where: { id: updateDto.clientId } });
      if (!client) {
        throw new NotFoundException(`Клиент с ID ${updateDto.clientId} не найден`);
      }
      request.client = { id: updateDto.clientId } as Client;
    }

    if (updateDto.statusId) {
      const status = await this.statusRepository.findOne({ where: { id: updateDto.statusId } });
      if (!status) {
        throw new NotFoundException(`Статус заявки с ID ${updateDto.statusId} не найден`);
      }
      request.status = { id: updateDto.statusId } as RequestStatus;
    }

    if (updateDto.serviceTypeId) {
      const serviceType = await this.serviceTypeRepository.findOne({ where: { id: updateDto.serviceTypeId } });
      if (!serviceType) {
        throw new NotFoundException(`Тип услуги с ID ${updateDto.serviceTypeId} не найден`);
      }
      request.serviceType = { id: updateDto.serviceTypeId } as ServiceType;
    }

    try {
      // Remove ID fields from updateDto to prevent them from being updated
      const { clientId, statusId, serviceTypeId, ...updateData } = updateDto;
      Object.assign(request, updateData);
      
      const updated = await this.requestRepository.save(request);
      return this.findOne(updated.id);
    } catch (error) {
      throw new InternalServerErrorException('Не удалось обновить заявку');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.requestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    }
  }
}
