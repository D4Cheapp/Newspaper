import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Client } from '@/modules/types';
import { GetClientsParams } from '../types';

export const getClients = (params?: GetClientsParams) =>
  request<Client[]>({ 
    method: ApiMethods.GET, 
    url: '/clients',
    body: params as Record<string, string> 
  });
