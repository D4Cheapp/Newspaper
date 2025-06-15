import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { DeliveryStatus } from 'constants/statuses';

export const getDeliveryStatuses = () =>
  request<DeliveryStatus[]>({ 
    method: ApiMethods.GET, 
    url: '/delivery-statuses',
  });
