import { request } from '@/utils/request';
import { ApiMethods } from '@/utils/request';
import { Delivery, GetDeliveriesParams } from '../types';

interface GetDeliveriesResponse {
  data: Delivery[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const getDeliveries = (params?: GetDeliveriesParams) => {
  const queryParams = new URLSearchParams();
  
  if (params?.page) queryParams.append('page', params.page.toString());
  if (params?.limit) queryParams.append('limit', params.limit.toString());
  if (params?.search) queryParams.append('search', params.search);
  if (params?.clientId) queryParams.append('clientId', params.clientId);
  if (params?.publicationId) queryParams.append('publicationId', params.publicationId);
  if (params?.statusId) queryParams.append('statusId', params.statusId);
  
  const queryString = queryParams.toString();
  const url = queryString ? `/deliveries?${queryString}` : '/deliveries';
  
  return request<GetDeliveriesResponse>({ 
    method: ApiMethods.GET, 
    url,
  });
};
