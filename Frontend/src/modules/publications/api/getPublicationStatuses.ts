import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { PublicationStatus } from 'constants/statuses';

export const getPublicationStatuses = () =>
  request<PublicationStatus[]>({ 
    method: ApiMethods.GET, 
    url: '/publication-statuses',
  });
