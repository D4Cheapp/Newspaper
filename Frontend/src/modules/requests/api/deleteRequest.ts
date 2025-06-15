import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const deleteRequest = (id: string) =>
  request<void>({ 
    method: ApiMethods.DELETE, 
    url: `/requests/${id}` 
  });
