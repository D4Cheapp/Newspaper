import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const deleteAuthor = (id: string) =>
  request<void>({ 
    method: ApiMethods.DELETE, 
    url: `/authors/${id}` 
  });
