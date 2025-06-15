import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Client } from './client.entity';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>
  ) {}

  async create(createDto: CreateClientDto): Promise<Client> {
    try {
      const client = this.clientRepository.create(createDto);
      return await this.clientRepository.save(client);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Клиент с таким email уже существует');
      }
      throw new InternalServerErrorException('Ошибка при создании клиента');
    }
  }

  async findAll(): Promise<Client[]> {
    try {
      return await this.clientRepository.find({
        order: { lastName: 'ASC', firstName: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка клиентов');
    }
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Клиент с ID ${id} не найден`);
    }
    return client;
  }

  async update(id: number, updateDto: UpdateClientDto): Promise<Client> {
    const client = await this.findOne(id);

    try {
      Object.assign(client, updateDto);
      return await this.clientRepository.save(client);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Клиент с таким email уже существует');
      }
      throw new InternalServerErrorException('Ошибка при обновлении данных клиента');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.clientRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Клиент с ID ${id} не найден`);
    }
  }
}
