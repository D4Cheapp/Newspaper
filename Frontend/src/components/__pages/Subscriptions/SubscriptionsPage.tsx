'use client';

import { getClients } from '@/modules/clients/api/getClients';
import { getPublicationTypes } from '@/modules/publications/api/getPublicationTypes';
import {
  createSubscription,
  deleteSubscription,
  getSubscriptions,
  updateSubscription,
} from '@/modules/subscriptions/api';
import { GetSubscriptionsParams } from '@/modules/subscriptions/types';
import { Client, Publication, Subscriptions } from '@/modules/types';
import { Button } from '@heroui/react';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { SubscriptionForm } from './SubscriptionForm';
import { SubscriptionsFilter } from './SubscriptionsFilter';
import { SubscriptionsList } from './SubscriptionsList';

export const SubscriptionsPage = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<Subscriptions[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [publicationTypes, setPublicationTypes] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentSubscription, setCurrentSubscription] = useState<Subscriptions | null>(null);
  const [filters, setFilters] = useState<GetSubscriptionsParams>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchSubscriptions = async (params: GetSubscriptionsParams = {}) => {
    try {
      setIsLoading(true);
      const data = await getSubscriptions(params);
      if (data) {
        setSubscriptions(data);
      } else {
        setSubscriptions([]);
      }
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
      setSubscriptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInitialData = async () => {
    try {
      setIsLoading(true);
      const [clientsData, publicationTypesData] = await Promise.all([
        getClients(),
        getPublicationTypes(),
      ]);

      if (clientsData) {
        setClients(clientsData);
      } else {
        setClients([]);
      }

      if (publicationTypesData) {
        setPublicationTypes(publicationTypesData);
      } else {
        setPublicationTypes([]);
      }

      await fetchSubscriptions();
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setClients([]);
      setPublicationTypes([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const handleFilterChange = (newFilters: Partial<GetSubscriptionsParams>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
    fetchSubscriptions({
      ...filters,
      ...newFilters,
    });
  };

  const handleResetFilters = () => {
    setFilters({});
    fetchSubscriptions();
  };

  const handleCreate = () => {
    setCurrentSubscription(null);
    setIsFormOpen(true);
  };

  const handleEdit = (subscription: Subscriptions) => {
    setCurrentSubscription(subscription);
    setIsFormOpen(true);
  };

  const handleDelete = async (subscription: Subscriptions) => {
    if (window.confirm('Вы уверены, что хотите удалить эту подписку?')) {
      try {
        await deleteSubscription(subscription.id);
        await fetchSubscriptions(filters);
        setIsFormOpen(false);
      } catch (error) {
        console.error('Error deleting subscription:', error);
      }
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      if (currentSubscription) {
        await updateSubscription(currentSubscription.id, data);
      } else {
        await createSubscription(data);
      }
      setIsFormOpen(false);
      await fetchSubscriptions(filters);
    } catch (error) {
      console.error('Error saving subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Управление подписками</h1>

      <SubscriptionsFilter
        clients={clients}
        publicationTypes={publicationTypes}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        onCreate={handleCreate}
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : (
        <SubscriptionsList
          subscriptions={subscriptions}
          onEdit={handleEdit}
          isLoading={false}
        />
      )}

      <SubscriptionForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        subscription={currentSubscription}
        onSubmit={handleSubmit}
        onDelete={currentSubscription ? handleDelete : undefined}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default SubscriptionsPage;
