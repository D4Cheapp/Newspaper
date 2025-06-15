import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Author } from '@/modules/types';

export const getAuthor = (id: string) =>
  request<Author>({ 
    method: ApiMethods.GET, 
    url: `/authors/${id}` 
  });
