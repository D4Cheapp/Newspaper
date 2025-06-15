import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Publication } from '@/modules/types';
import { UpsertPublicationDto } from '../types';

export const createPublication = (body: UpsertPublicationDto) =>
  request<Publication>({ 
    method: ApiMethods.POST, 
    url: '/publications', 
    body 
  });
