import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Requests } from '@/modules/types';

export const getRequest = (id: string) =>
  request<Requests>({ 
    method: ApiMethods.GET, 
    url: `/requests/${id}` 
  });
