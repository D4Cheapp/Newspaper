import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const deleteClient = (id: string) =>
  request<void>({ 
    method: ApiMethods.DELETE, 
    url: `/clients/${id}` 
  });
