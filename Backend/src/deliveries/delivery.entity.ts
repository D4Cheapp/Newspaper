import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Client } from '../clients/client.entity';
import { Publication } from '../publications/publication.entity';
import { DeliveryStatus } from './delivery-status.entity';

@Entity({ name: 'deliveries' })
export class Delivery {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (item) => item.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => Publication, (item) => item.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'publication_id' })
  publication: Publication;

  @ManyToOne(() => DeliveryStatus, (item) => item.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'status_id' })
  status: DeliveryStatus;

  @Column({ name: 'address', type: 'text' })
  address: string;

  @Column({ name: 'delivery_date', type: 'date' })
  deliveryDate: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
