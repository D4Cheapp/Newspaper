import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Client } from '@/modules/types';

export const getClient = (id: string) =>
  request<Client>({ 
    method: ApiMethods.GET, 
    url: `/clients/${id}` 
  });
