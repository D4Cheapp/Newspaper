import { PrintingHouses } from '@/modules/types';

import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';

import { GetPrintingHousesParams } from '../types';

export const getPrintingHouses = (params?: GetPrintingHousesParams) =>
  request<PrintingHouses[]>({
    method: ApiMethods.GET,
    url: '/printing-houses',
    body: params as Record<string, string>,
  });
