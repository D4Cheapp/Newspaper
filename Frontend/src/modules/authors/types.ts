import { Author } from '@/modules/types';

export type UpsertAuthorDto = Omit<Author, 'id' | 'createdAt' | 'updatedAt'>;

export type GetAuthorsParams = {
  page?: number;
  limit?: number;
  search?: string;
};
