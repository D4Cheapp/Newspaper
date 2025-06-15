import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Publication } from '@/modules/types';

export const getPublication = (id: string) =>
  request<Publication>({ 
    method: ApiMethods.GET, 
    url: `/publications/${id}` 
  });
