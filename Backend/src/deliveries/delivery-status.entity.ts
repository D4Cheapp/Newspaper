import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'delivery_statuses' })
export class DeliveryStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
