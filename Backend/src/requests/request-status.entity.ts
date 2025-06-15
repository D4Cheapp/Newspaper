import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'request_statuses' })
export class RequestStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
