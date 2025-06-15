import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Delivery } from '../types';

export const getDelivery = (id: number) =>
  request<Delivery>({ 
    method: ApiMethods.GET, 
    url: `/deliveries/${id}`,
  });
