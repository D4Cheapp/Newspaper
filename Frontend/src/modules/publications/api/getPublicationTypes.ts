import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { PublicationTypes } from 'constants/entity-types';

export const getPublicationTypes = () =>
  request<PublicationTypes[]>({ 
    method: ApiMethods.GET, 
    url: '/publication-types',
  });
