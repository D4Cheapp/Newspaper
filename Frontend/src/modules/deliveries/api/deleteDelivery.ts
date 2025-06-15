import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const deleteDelivery = (id: number) =>
  request<void>({ 
    method: ApiMethods.DELETE, 
    url: `/deliveries/${id}`,
  });
