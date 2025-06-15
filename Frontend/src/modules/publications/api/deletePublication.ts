import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const deletePublication = (id: string) =>
  request<void>({ 
    method: ApiMethods.DELETE, 
    url: `/publications/${id}` 
  });
