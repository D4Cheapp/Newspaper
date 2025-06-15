import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Subscriptions } from '@/modules/types';
import { GetSubscriptionsParams } from '../types';

export const getSubscriptions = (params?: GetSubscriptionsParams) =>
  request<Subscriptions[]>({ 
    method: ApiMethods.GET, 
    url: '/subscriptions',
    body: params as Record<string, string> 
  });
