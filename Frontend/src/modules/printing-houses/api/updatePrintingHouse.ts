import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { PrintingHouses } from '@/modules/types';
import { UpsertPrintingHouseDto } from '../types';

export const updatePrintingHouse = (id: string, body: UpsertPrintingHouseDto) =>
  request<PrintingHouses>({ 
    method: ApiMethods.PUT, 
    url: `/printing-houses/${id}`, 
    body 
  });
