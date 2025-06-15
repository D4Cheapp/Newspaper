import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Client } from '../clients/client.entity';
import { Publication } from '../publications/publication.entity';

type SubscriptionWithRelations = Subscription & {
  client: Client;
  publication: Publication;
};

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
  ) {}

  async create(createDto: CreateSubscriptionDto): Promise<SubscriptionWithRelations> {
    const { clientId, publicationId, ...subscriptionData } = createDto;

    const [client, publication] = await Promise.all([
      this.clientRepository.findOne({ where: { id: clientId } }),
      this.publicationRepository.findOne({ where: { id: publicationId } }),
    ]);

    if (!client) {
      throw new NotFoundException(`Клиент с ID ${clientId} не найден`);
    }

    if (!publication) {
      throw new NotFoundException(`Публикация с ID ${publicationId} не найдена`);
    }

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: {
        client: { id: clientId },
        publication: { id: publicationId },
      },
    });

    if (existingSubscription) {
      throw new ConflictException('Подписка для данного клиента на это издание уже существует');
    }

    try {
      const subscription = this.subscriptionRepository.create({
        ...subscriptionData,
        client: { id: clientId },
        publication: { id: publicationId },
      });

      const savedSubscription = await this.subscriptionRepository.save(subscription);
      return this.findOne(savedSubscription.id);
    } catch (error) {
      throw new InternalServerErrorException('Не удалось создать подписку');
    }
  }

  async findAll(): Promise<SubscriptionWithRelations[]> {
    try {
      return await this.subscriptionRepository.find({
        relations: ['client', 'publication']
      }) as SubscriptionWithRelations[];
    } catch (error) {
      throw new InternalServerErrorException('Не удалось загрузить список подписок');
    }
  }

  async findOne(id: number): Promise<SubscriptionWithRelations> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['client', 'publication']
    });

    if (!subscription) {
      throw new NotFoundException(`Подписка с ID ${id} не найдена`);
    }

    return subscription as SubscriptionWithRelations;
  }

  async update(id: number, updateDto: UpdateSubscriptionDto): Promise<SubscriptionWithRelations> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['client', 'publication']
    });

    if (!subscription) {
      throw new NotFoundException(`Подписка с ID ${id} не найдена`);
    }

    if (updateDto.clientId) {
      const client = await this.clientRepository.findOne({ where: { id: updateDto.clientId } });
      if (!client) {
        throw new NotFoundException(`Клиент с ID ${updateDto.clientId} не найден`);
      }
      subscription.client = { id: updateDto.clientId } as Client;
    }

    if (updateDto.publicationId) {
      const publication = await this.publicationRepository.findOne({ where: { id: updateDto.publicationId } });
      if (!publication) {
        throw new NotFoundException(`Публикация с ID ${updateDto.publicationId} не найдена`);
      }
      subscription.publication = { id: updateDto.publicationId } as Publication;
    }

    try {
      // Remove ID fields from updateDto to prevent them from being updated
      const { clientId, publicationId, ...updateData } = updateDto;
      Object.assign(subscription, updateData);
      
      const updated = await this.subscriptionRepository.save(subscription);
      return this.findOne(updated.id);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Подписка для данного клиента на это издание уже существует');
      }
      throw new InternalServerErrorException('Не удалось обновить подписку');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.subscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Подписка с ID ${id} не найдена`);
    }
  }
}
