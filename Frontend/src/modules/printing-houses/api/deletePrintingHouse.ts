import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

export const deletePrintingHouse = (id: string) =>
  request<void>({ 
    method: ApiMethods.DELETE, 
    url: `/printing-houses/${id}` 
  });
