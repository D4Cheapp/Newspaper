import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Client } from '@/modules/types';
import { UpsertClientDto } from '../types';

export const updateClient = (id: string, body: UpsertClientDto) =>
  request<Client>({ 
    method: ApiMethods.PUT, 
    url: `/clients/${id}`, 
    body 
  });
