import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Author } from '../authors/author.entity';
import { Publication } from './publication.entity';

@Entity({ name: 'publication_authors' })
export class PublicationAuthor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Author, (author) => author.id, { eager: true })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => Publication, (publication) => publication.id, { eager: true })
  @JoinColumn({ name: 'publication_id' })
  publication: Publication;
}
