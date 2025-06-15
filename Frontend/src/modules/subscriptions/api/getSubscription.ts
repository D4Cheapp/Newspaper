import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Subscriptions } from '@/modules/types';

export const getSubscription = (id: string) =>
  request<Subscriptions>({ 
    method: ApiMethods.GET, 
    url: `/subscriptions/${id}` 
  });
