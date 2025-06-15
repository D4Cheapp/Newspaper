import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Delivery } from './delivery.entity';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Client } from '../clients/client.entity';
import { Publication } from '../publications/publication.entity';
import { DeliveryStatus } from './delivery-status.entity';

@Injectable()
export class DeliveriesService {
  constructor(
    @InjectRepository(Delivery)
    private readonly deliveryRepository: Repository<Delivery>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(DeliveryStatus)
    private readonly deliveryStatusRepository: Repository<DeliveryStatus>,
  ) {}

  async create(createDto: CreateDeliveryDto): Promise<Delivery> {
    const { clientId, publicationId, statusId, ...deliveryData } = createDto;

    const [client, publication, status] = await Promise.all([
      this.clientRepository.findOne({ where: { id: clientId } }),
      this.publicationRepository.findOne({ where: { id: publicationId } }),
      this.deliveryStatusRepository.findOne({ where: { id: statusId } }),
    ]);

    if (!client) {
      throw new NotFoundException(`Клиент с ID ${clientId} не найден`);
    }
    if (!publication) {
      throw new NotFoundException(`Публикация с ID ${publicationId} не найдена`);
    }
    if (!status) {
      throw new NotFoundException(`Статус доставки с ID ${statusId} не найден`);
    }

    try {
      const delivery = this.deliveryRepository.create({
        ...deliveryData,
        client: { id: clientId },
        publication: { id: publicationId },
        status: { id: statusId },
      });

      const savedDelivery = await this.deliveryRepository.save(delivery);
      return this.findOne(savedDelivery.id);
    } catch (error) {
      throw new InternalServerErrorException('Не удалось создать запись о доставке');
    }
  }

  async findAll(): Promise<Delivery[]> {
    try {
      const deliveries = await this.deliveryRepository.find();
      return Promise.all(deliveries.map(delivery => this.enrichDeliveryWithRelations(delivery)));
    } catch (error) {
      throw new InternalServerErrorException('Не удалось загрузить список доставок');
    }
  }

  async findOne(id: number): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id } });

    if (!delivery) {
      throw new NotFoundException(`Доставка с ID ${id} не найдена`);
    }

    return this.enrichDeliveryWithRelations(delivery);
  }

  private async enrichDeliveryWithRelations(delivery: Delivery): Promise<Delivery> {
    return this.deliveryRepository.findOne({
      where: { id: delivery.id },
      relations: ['client', 'publication', 'status']
    }) as Promise<Delivery>;
  }

  async update(id: number, updateDto: UpdateDeliveryDto): Promise<Delivery> {
    const delivery = await this.deliveryRepository.findOne({ where: { id } });

    if (!delivery) {
      throw new NotFoundException(`Доставка с ID ${id} не найдена`);
    }

    if (updateDto.clientId) {
      const client = await this.clientRepository.findOne({ where: { id: updateDto.clientId } });
      if (!client) {
        throw new NotFoundException(`Клиент с ID ${updateDto.clientId} не найден`);
      }
      delivery.client = { id: updateDto.clientId } as Client;
    }

    if (updateDto.publicationId) {
      const publication = await this.publicationRepository.findOne({ where: { id: updateDto.publicationId } });
      if (!publication) {
        throw new NotFoundException(`Публикация с ID ${updateDto.publicationId} не найдена`);
      }
      delivery.publication = { id: updateDto.publicationId } as Publication;
    }

    if (updateDto.statusId) {
      const status = await this.deliveryStatusRepository.findOne({ where: { id: updateDto.statusId } });
      if (!status) {
        throw new NotFoundException(`Статус доставки с ID ${updateDto.statusId} не найден`);
      }
      delivery.status = { id: updateDto.statusId } as DeliveryStatus;
    }

    try {
      Object.assign(delivery, updateDto);
      const updated = await this.deliveryRepository.save(delivery);
      return this.findOne(updated.id);
    } catch (error) {
      throw new InternalServerErrorException('Не удалось обновить запись о доставке');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.deliveryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Доставка с ID ${id} не найдена`);
    }
  }
}
