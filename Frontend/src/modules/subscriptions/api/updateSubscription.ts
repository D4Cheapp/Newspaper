import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Subscriptions } from '@/modules/types';
import { UpsertSubscriptionDto } from '../types';

export const updateSubscription = (id: string, body: UpsertSubscriptionDto) =>
  request<Subscriptions>({ 
    method: ApiMethods.PUT, 
    url: `/subscriptions/${id}`, 
    body 
  });
