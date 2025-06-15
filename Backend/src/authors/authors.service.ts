import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createDto: CreateAuthorDto): Promise<Author> {
    try {
      const author = this.authorRepository.create(createDto);
      return await this.authorRepository.save(author);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при создании автора');
    }
  }

  async findAll(): Promise<Author[]> {
    try {
      return await this.authorRepository.find({
        order: { lastName: 'ASC', firstName: 'ASC' },
      });
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при получении списка авторов');
    }
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({ where: { id } });
    if (!author) {
      throw new NotFoundException(`Автор с ID ${id} не найден`);
    }
    return author;
  }

  async update(id: number, updateDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    
    try {
      Object.assign(author, updateDto);
      return await this.authorRepository.save(author);
    } catch (error) {
      throw new InternalServerErrorException('Ошибка при обновлении данных автора');
    }
  }

  async remove(id: number): Promise<void> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Автор с ID ${id} не найден`);
    }
  }
}
