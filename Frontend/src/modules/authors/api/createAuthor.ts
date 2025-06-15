import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Author } from '@/modules/types';
import { UpsertAuthorDto } from '../types';

export const createAuthor = (body: UpsertAuthorDto) =>
  request<Author>({ 
    method: ApiMethods.POST, 
    url: '/authors', 
    body 
  });
