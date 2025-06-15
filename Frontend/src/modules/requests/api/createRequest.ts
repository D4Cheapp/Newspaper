import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Requests } from '@/modules/types';
import { UpsertRequestDto } from '../types';

export const createRequest = (body: UpsertRequestDto) =>
  request<Requests>({ 
    method: ApiMethods.POST, 
    url: '/requests', 
    body 
  });
