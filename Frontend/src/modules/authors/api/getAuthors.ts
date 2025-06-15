import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Author } from '@/modules/types';
import { GetAuthorsParams } from '../types';

export const getAuthors = (params?: GetAuthorsParams) =>
  request<Author[]>({ 
    method: ApiMethods.GET, 
    url: '/authors',
    body: params as Record<string, string> 
  });
