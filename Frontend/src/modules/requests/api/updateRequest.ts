import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Requests } from '@/modules/types';
import { UpsertRequestDto } from '../types';

export const updateRequest = (id: string, body: UpsertRequestDto) =>
  request<Requests>({ 
    method: ApiMethods.PUT, 
    url: `/requests/${id}`, 
    body 
  });
