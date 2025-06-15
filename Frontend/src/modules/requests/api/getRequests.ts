import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Requests } from '@/modules/types';
import { GetRequestsParams } from '../types';

export const getRequests = (params?: GetRequestsParams) =>
  request<Requests[]>({ 
    method: ApiMethods.GET, 
    url: '/requests',
    body: params as Record<string, string> 
  });
