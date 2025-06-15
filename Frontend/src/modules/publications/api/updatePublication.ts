import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Publication } from '@/modules/types';
import { UpsertPublicationDto } from '../types';

export const updatePublication = (id: string, body: UpsertPublicationDto) =>
  request<Publication>({ 
    method: ApiMethods.PUT, 
    url: `/publications/${id}`, 
    body 
  });
