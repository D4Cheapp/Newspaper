import { Subscriptions } from '@/modules/types';

export type UpsertSubscriptionDto = Omit<Subscriptions, 'id' | 'createdAt' | 'updatedAt' | 'publication'> & {
  publicationTypeId: string;
};

export type GetSubscriptionsParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
  clientId?: string;
  publicationTypeId?: string;
};
