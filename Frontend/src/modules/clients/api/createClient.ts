import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Client } from '@/modules/types';
import { UpsertClientDto } from '../types';

export const createClient = (body: UpsertClientDto) =>
  request<Client>({ 
    method: ApiMethods.POST, 
    url: '/clients', 
    body 
  });
