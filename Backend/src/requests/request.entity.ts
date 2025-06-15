import { Client } from 'src/clients/client.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { RequestStatus } from './request-status.entity';
import { ServiceType } from './service-type.entity';

@Entity({ name: 'requests' })
export class Request {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'client_id' })
  client: Client;

  @ManyToOne(() => RequestStatus, (requestStatus) => requestStatus.id, {
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'request_status_id' })
  status: RequestStatus;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.id, { eager: false, nullable: false })
  @JoinColumn({ name: 'service_type_id' })
  serviceType: ServiceType;

  @Column({ type: 'text', nullable: true })
  description: string;

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
