import { Requests } from '@/modules/types';

export type UpsertRequestDto = Omit<Requests, 'id' | 'createdAt' | 'updatedAt'>;

export type GetRequestsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  clientId?: string;
  authorId?: string;
};
