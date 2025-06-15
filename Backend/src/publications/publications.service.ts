import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { Author } from '../authors/author.entity';
import { PrintingHouse } from '../printing-houses/printing-house.entity';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { PublicationAuthor } from './publication-author.entity';
import { PublicationStatus } from './publication-status.entity';
import { PublicationType } from './publication-type.entity';
import { Publication } from './publication.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    @InjectRepository(PublicationType)
    private readonly typeRepository: Repository<PublicationType>,
    @InjectRepository(PublicationStatus)
    private readonly statusRepository: Repository<PublicationStatus>,
    @InjectRepository(PrintingHouse)
    private readonly printingHouseRepository: Repository<PrintingHouse>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
    @InjectRepository(PublicationAuthor)
    private readonly publicationAuthorRepository: Repository<PublicationAuthor>
  ) {}

  async create(createDto: CreatePublicationDto): Promise<Publication> {
    const { typeId, statusId, printingHouseId, authorIds, title, description, price } = createDto;

    const [typeExists, statusExists, printingHouseExists] = await Promise.all([
      this.typeRepository.existsBy({ id: typeId }),
      this.statusRepository.existsBy({ id: statusId }),
      this.printingHouseRepository.existsBy({ id: printingHouseId }),
    ]);

    if (!typeExists) {
      throw new NotFoundException(`Тип издания с ID ${typeId} не найден`);
    }
    if (!statusExists) {
      throw new NotFoundException(`Статус издания с ID ${statusId} не найден`);
    }
    if (!printingHouseExists) {
      throw new NotFoundException(`Типография с ID ${printingHouseId} не найдена`);
    }

    if (authorIds && authorIds.length > 0) {
      const authorsCount = await this.authorRepository.count({
        where: { id: In(authorIds) },
      });

      if (authorsCount !== authorIds.length) {
        throw new NotFoundException('Один или несколько авторов не найдены');
      }
    }

    const publication = this.publicationRepository.create({
      name: title,
      description,
      price: price.toString(),
      publicationType: { id: typeId },
      publicationStatus: { id: statusId },
      printingHouse: { id: printingHouseId },
      circulation: 0,
    });

    try {
      const savedPublication = await this.publicationRepository.save(publication);

      if (authorIds && authorIds.length > 0) {
        const publicationAuthors = authorIds.map((authorId) => {
          const pa = new PublicationAuthor();
          pa.publication = { id: savedPublication.id } as Publication;
          pa.author = { id: authorId } as Author;
          return pa;
        });
        await this.publicationAuthorRepository.save(publicationAuthors);
      }

      return this.findOne(savedPublication.id);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Публикация с таким названием уже существует');
      }
      throw new InternalServerErrorException('Не удалось создать публикацию');
    }
  }

  async findAll(): Promise<Publication[]> {
    try {
      return await this.publicationRepository.find({
        relations: ['publicationType', 'publicationStatus', 'printingHouse', 'publicationAuthors'],
      });
    } catch (error) {
      throw new InternalServerErrorException('Не удалось загрузить список публикаций');
    }
  }

  async findOne(id: number): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id },
      relations: ['publicationType', 'publicationStatus', 'printingHouse', 'publicationAuthors'],
    });

    if (!publication) {
      throw new NotFoundException(`Публикация с ID ${id} не найдена`);
    }

    return publication;
  }

  async update(id: number, updateDto: UpdatePublicationDto): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id },
    });

    if (!publication) {
      throw new NotFoundException(`Публикация с ID ${id} не найдена`);
    }

    if (updateDto.title) publication.name = updateDto.title;
    if (updateDto.description) publication.description = updateDto.description;
    if (updateDto.price) publication.price = updateDto.price.toString();

    if (updateDto.typeId) {
      const exists = await this.typeRepository.existsBy({ id: updateDto.typeId });
      if (!exists) {
        throw new NotFoundException(`Тип публикации с ID ${updateDto.typeId} не найден`);
      }
      publication.publicationType = { id: updateDto.typeId } as PublicationType;
    }

    if (updateDto.statusId) {
      const exists = await this.statusRepository.existsBy({ id: updateDto.statusId });
      if (!exists) {
        throw new NotFoundException(`Статус публикации с ID ${updateDto.statusId} не найден`);
      }
      publication.publicationStatus = { id: updateDto.statusId } as PublicationStatus;
    }

    if (updateDto.printingHouseId) {
      const exists = await this.printingHouseRepository.existsBy({ id: updateDto.printingHouseId });
      if (!exists) {
        throw new NotFoundException(`Типография с ID ${updateDto.printingHouseId} не найдена`);
      }
      publication.printingHouse = { id: updateDto.printingHouseId } as PrintingHouse;
    }

    if (updateDto.authorIds && Array.isArray(updateDto.authorIds)) {
      await this.publicationAuthorRepository.delete({ publication: { id } });

      const authorsCount = await this.authorRepository.count({
        where: { id: In(updateDto.authorIds) },
      });

      if (authorsCount !== updateDto.authorIds.length) {
        throw new NotFoundException('Один или несколько авторов не найдены');
      }

      const publicationAuthors = updateDto.authorIds.map((authorId) => {
        const pa = new PublicationAuthor();
        pa.publication = { id } as Publication;
        pa.author = { id: authorId } as Author;
        return pa;
      });

      await this.publicationAuthorRepository.save(publicationAuthors as any);
    }

    try {
      if (updateDto.title) publication.name = updateDto.title;
      if (updateDto.description) publication.description = updateDto.description;
      if (updateDto.price) publication.price = updateDto.price.toString();

      publication.updatedAt = new Date();

      const updatedPublication = await this.publicationRepository.save(publication);
      return this.findOne(updatedPublication.id);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Публикация с таким названием уже существует');
      }
      throw new InternalServerErrorException('Не удалось обновить публикацию');
    }
  }

  async remove(id: number): Promise<void> {
    const exists = await this.publicationRepository.existsBy({ id });
    if (!exists) {
      throw new NotFoundException(`Публикация с ID ${id} не найдена`);
    }

    await this.publicationAuthorRepository.delete({ publication: { id } } as any);

    const result = await this.publicationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Публикация с ID ${id} не найдена`);
    }
  }
}
