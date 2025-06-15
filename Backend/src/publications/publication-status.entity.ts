import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publication_statuses' })
export class PublicationStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
