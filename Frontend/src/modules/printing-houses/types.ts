import { PrintingHouses } from '@/modules/types';

export type UpsertPrintingHouseDto = Omit<PrintingHouses, 'id' | 'createdAt' | 'updatedAt'>;

export type GetPrintingHousesParams = {
  page?: number;
  limit?: number;
  search?: string;
};
