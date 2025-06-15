import { Publication } from '@/modules/types';

export type UpsertPublicationDto = Omit<
  Publication,
  'id' | 'createdAt' | 'updatedAt' | 'publicationStatus' | 'publicationType' | 'authorIds'
> & {
  publicationTypeId: string;
  publicationStatusId: string;
  printingHouseId: string;
  authorIds: string[];
};

export type GetPublicationsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  type?: string;
};
