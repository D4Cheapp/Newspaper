import { Client } from '@/modules/types';

export type UpsertClientDto = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

export type GetClientsParams = {
  page?: number;
  limit?: number;
  search?: string;
};
