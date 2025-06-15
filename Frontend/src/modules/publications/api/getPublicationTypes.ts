import { PublicationTypes } from 'constants/entity-types';

import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const getPublicationTypes = () =>
  request<{ id: string; name: PublicationTypes }[]>({
    method: ApiMethods.GET,
    url: '/publication-types',
  });
