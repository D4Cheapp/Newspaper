import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { PrintingHouses } from '@/modules/types';

export const getPrintingHouse = (id: string) =>
  request<PrintingHouses>({ 
    method: ApiMethods.GET, 
    url: `/printing-houses/${id}` 
  });
