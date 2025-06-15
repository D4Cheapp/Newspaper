import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Subscriptions } from '@/modules/types';
import { UpsertSubscriptionDto } from '../types';

export const createSubscription = (body: UpsertSubscriptionDto) =>
  request<Subscriptions>({ 
    method: ApiMethods.POST, 
    url: '/subscriptions', 
    body 
  });
