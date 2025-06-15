import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Delivery, CreateDeliveryDto } from '../types';

export const createDelivery = (data: CreateDeliveryDto) =>
  request<Delivery>({ 
    method: ApiMethods.POST, 
    url: '/deliveries',
    body: data,
  });
