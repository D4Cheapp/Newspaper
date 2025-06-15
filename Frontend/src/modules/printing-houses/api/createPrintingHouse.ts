import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { PrintingHouses } from '@/modules/types';
import { UpsertPrintingHouseDto } from '../types';

export const createPrintingHouse = (body: UpsertPrintingHouseDto) =>
  request<PrintingHouses>({ 
    method: ApiMethods.POST, 
    url: '/printing-houses', 
    body 
  });
