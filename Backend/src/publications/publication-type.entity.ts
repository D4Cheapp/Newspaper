import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publication_types' })
export class PublicationType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
