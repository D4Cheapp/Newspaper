import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Delivery, UpdateDeliveryDto } from '../types';

export const updateDelivery = (id: number, data: UpdateDeliveryDto) =>
  request<Delivery>({ 
    method: ApiMethods.PATCH, 
    url: `/deliveries/${id}`,
    body: data,
  });
