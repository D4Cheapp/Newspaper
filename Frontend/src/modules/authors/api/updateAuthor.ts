import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Author } from '@/modules/types';
import { UpsertAuthorDto } from '../types';

export const updateAuthor = (id: string, body: UpsertAuthorDto) =>
  request<Author>({ 
    method: ApiMethods.PUT, 
    url: `/authors/${id}`, 
    body 
  });
