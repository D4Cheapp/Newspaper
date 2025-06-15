import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const deleteSubscription = (id: string) =>
  request<void>({ 
    method: ApiMethods.DELETE, 
    url: `/subscriptions/${id}` 
  });
