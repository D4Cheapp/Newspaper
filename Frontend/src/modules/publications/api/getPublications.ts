import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Publication } from '@/modules/types';
import { GetPublicationsParams } from '../types';

export const getPublications = (params?: GetPublicationsParams) =>
  request<Publication[]>({ 
    method: ApiMethods.GET, 
    url: '/publications',
    body: params as Record<string, string> 
  });
