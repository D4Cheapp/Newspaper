import { Deliveries } from '@/modules/types';

export interface Delivery extends Omit<Deliveries, 'deliveryStatus'> {
  deliveryStatus: DeliveryStatus;
}

export interface DeliveryStatus {
  id: string;
  name: string;
  description: string;
  color: string;
}

export interface CreateDeliveryDto {
  clientId: string;
  publicationId: string;
  deliveryStatusId: string;
}

export interface UpdateDeliveryDto extends Partial<CreateDeliveryDto> {}

export type UpsertDeliveryDto = Omit<
  Delivery,
  'id' | 'createdAt' | 'updatedAt' | 'client' | 'publication' | 'deliveryStatus'
> & {
  clientId: string;
  publicationId: string;
  deliveryStatusId: string;
  quantity: number;
};

export type GetDeliveriesParams = {
  page?: number;
  limit?: number;
  search?: string;
  clientId?: string;
  publicationId?: string;
  statusId?: string;
};
