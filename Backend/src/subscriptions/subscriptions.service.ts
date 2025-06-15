import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from './subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Client } from '../clients/client.entity';
import { PublicationType } from '../publications/publication-type.entity';

type SubscriptionWithRelations = Subscription & {
  client: Client;
  publicationType: PublicationType;
};

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
    @InjectRepository(PublicationType)
    private readonly publicationTypeRepository: Repository<PublicationType>,
  ) {}

  async create(createDto: CreateSubscriptionDto): Promise<SubscriptionWithRelations> {
    const { clientId, publicationTypeId, ...subscriptionData } = createDto;

    const [client, publicationType] = await Promise.all([
      this.clientRepository.findOne({ where: { id: clientId } }),
      this.publicationTypeRepository.findOne({ where: { id: publicationTypeId } }),
    ]);

    if (!client) {
      throw new NotFoundException(`Клиент с ID ${clientId} не найден`);
    }

    if (!publicationType) {
      throw new NotFoundException(`Тип публикации с ID ${publicationTypeId} не найден`);
    }

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: {
        client: { id: clientId },
        publicationType: { id: publicationTypeId },
      },
    });

    if (existingSubscription) {
      throw new ConflictException('Подписка для данного клиента на этот тип публикации уже существует');
    }

    try {
      const subscription = this.subscriptionRepository.create({
        ...subscriptionData,
        client: { id: clientId } as Client,
        publicationType: { id: publicationTypeId } as PublicationType,
      });

      const savedSubscription = await this.subscriptionRepository.save(subscription);

      return {
        ...savedSubscription,
        client,
        publicationType,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании подписки');
    }
  }

  async findAll(): Promise<SubscriptionWithRelations[]> {
    return (await this.subscriptionRepository.find({
      relations: ['client', 'publicationType'],
    })) as unknown as SubscriptionWithRelations[];
  }

  async findOne(id: number): Promise<SubscriptionWithRelations> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['client', 'publicationType'],
    });

    if (!subscription) {
      throw new NotFoundException(`Подписка с ID ${id} не найдена`);
    }

    return subscription as unknown as SubscriptionWithRelations;
  }

  async update(id: number, updateDto: UpdateSubscriptionDto): Promise<SubscriptionWithRelations> {
    const subscription = await this.subscriptionRepository.findOne({
      where: { id },
      relations: ['client', 'publicationType']
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

    if (updateDto.publicationTypeId) {
      const publicationType = await this.publicationTypeRepository.findOne({ 
        where: { id: updateDto.publicationTypeId } 
      });
      if (!publicationType) {
        throw new NotFoundException(`Тип публикации с ID ${updateDto.publicationTypeId} не найден`);
      }
      subscription.publicationType = { id: updateDto.publicationTypeId } as PublicationType;
    }

    if (updateDto.endDate) {
      subscription.endDate = updateDto.endDate;
    }

    try {
      const updatedSubscription = await this.subscriptionRepository.save(subscription);
      
      // Получаем актуальные данные связанных сущностей
      const [client, publicationType] = await Promise.all([
        this.clientRepository.findOne({ where: { id: updatedSubscription.client.id } }),
        this.publicationTypeRepository.findOne({ where: { id: updatedSubscription.publicationType.id } }),
      ]);

      return {
        ...updatedSubscription,
        client: client!,
        publicationType: publicationType!,
      };
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при обновлении подписки');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.subscriptionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Подписка с ID ${id} не найдена`);
    }
  }
}
