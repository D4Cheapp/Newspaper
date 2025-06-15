import { Publication } from '@/modules/types';

export type UpsertPublicationDto = Omit<
  Publication,
  'id' | 'createdAt' | 'updatedAt' | 'publicationStatus' | 'publicationType'
> & {
  publicationTypeId: string;
  publicationStatusId: string;
  printingHouseId: string;
};

export type GetPublicationsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
};
