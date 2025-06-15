import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { PrintingHouse } from '../printing-houses/printing-house.entity';
import { PublicationAuthor } from './publication-author.entity';
import { PublicationStatus } from './publication-status.entity';
import { PublicationType } from './publication-type.entity';

@Entity({ name: 'publications' })
export class Publication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => PublicationType, (item) => item.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'publication_type_id' })
  publicationType: PublicationType;

  @ManyToOne(() => PrintingHouse, (item) => item.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'printing_house_id' })
  printingHouse: PrintingHouse;

  @Column({ length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: string;

  @Column()
  circulation: number;

  @ManyToOne(() => PublicationStatus, (item) => item.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'publication_status_id' })
  publicationStatus: PublicationStatus;

  @OneToMany('PublicationAuthor', 'publication', {
    cascade: true,
  })
  publicationAuthors: Promise<PublicationAuthor[]>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
