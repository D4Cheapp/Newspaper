import { PublicationTypes, ServiceTypes } from 'constants/entity-types';
import { DeliveryStatus, PublicationStatus, RequestStatus } from 'constants/statuses';

export type EntityType<T> = {
  id: string;
  name: T;
};

export type Publication = {
  id: string;
  name: string;
  publicationType: EntityType<PublicationTypes>;
  publicationStatus: EntityType<PublicationStatus>;
  description: string;
  price: number;
  circulation: number;
  createdAt: string;
  updatedAt: string;
};

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  createdAt: string;
  updatedAt: string;
};

export type Client = {
  id: string;
  address: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Deliveries = {
  id: string;
  client: Client;
  publication: Publication;
  deliveryStatus: EntityType<DeliveryStatus>;
  quantity: number;
  createdAt: string;
  updatedAt: string;
};

export type PrintingHouses = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export type Requests = {
  id: string;
  client: Client;
  requestStatus: EntityType<RequestStatus>;
  serviceType: EntityType<ServiceTypes>;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type Subscriptions = {
  id: string;
  client: Client;
  publication: Publication;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};
