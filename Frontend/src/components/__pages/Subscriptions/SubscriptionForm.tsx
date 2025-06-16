'use client';

import { getClients } from '@/modules/clients/api/getClients';
import { getPublicationTypes } from '@/modules/publications/api/getPublicationTypes';
import { UpsertSubscriptionDto } from '@/modules/subscriptions/types';
import { Client, Subscriptions } from '@/modules/types';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@heroui/react';

import { useEffect, useState } from 'react';

interface SubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  subscription?: Subscriptions | null;
  onSubmit: (data: UpsertSubscriptionDto) => Promise<void>;
  onDelete?: (subscription: Subscriptions) => Promise<void>;
  isSubmitting: boolean;
}

export const SubscriptionForm = ({
  isOpen,
  onClose,
  subscription,
  onSubmit,
  onDelete,
  isSubmitting,
}: SubscriptionFormProps) => {
  const [formData, setFormData] = useState<{
    client: Client | null;
    publicationType: { id: string; name: string } | null;
    endDate: string;
  }>({
    client: null,
    publicationType: null,
    endDate: '',
  });
  const [clients, setClients] = useState<Client[]>([]);
  const [publicationTypes, setPublicationTypes] = useState<{ id: string; name: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Fetching clients and publication types...');
        const [clientsResponse, publicationTypesResponse] = await Promise.all([
          getClients(),
          getPublicationTypes(),
        ]);

        const clientsData = Array.isArray(clientsResponse) ? clientsResponse : [];
        const publicationTypesData = Array.isArray(publicationTypesResponse)
          ? publicationTypesResponse
          : [];

        console.log('Fetched publication types:', publicationTypesData);

        setClients(clientsData);
        setPublicationTypes(publicationTypesData);

        if (subscription?.id && !formData.client) {
          console.log('Initializing form with subscription data:', subscription);
          const client = clientsData.find(c => c.id === subscription.client?.id) || null;
          const publicationType =
            publicationTypesData.find(pt => pt.id === subscription.publicationType?.id) || null;

          console.log('Found client and publication type:', { client, publicationType });

          setFormData({
            client,
            publicationType: publicationType
              ? {
                  id: publicationType.id,
                  name: publicationType.name,
                }
              : null,
            endDate: subscription.endDate
              ? new Date(subscription.endDate).toISOString().split('T')[0]
              : '',
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Не удалось загрузить данные. Пожалуйста, попробуйте еще раз.');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  useEffect(() => {
    const initializeFormData = async () => {
      if (subscription?.id) {
        // Find the publication type from the subscription's publication
        const publicationType = subscription.publication?.publicationType || null;

        setFormData({
          client: subscription.client ? { ...subscription.client } : null,
          publicationType: publicationType
            ? {
                id: publicationType.id,
                name: publicationType.name as string,
              }
            : null,
          endDate: subscription.endDate
            ? new Date(subscription.endDate).toISOString().split('T')[0]
            : '',
        });
      } else {
        setFormData({
          client: null,
          publicationType: null,
          endDate: '',
        });
      }
    };

    initializeFormData();
  }, [subscription]);

  const handleClientChange = (keys: any) => {
    const key = Array.from(keys)[0] as string;
    const client = clients.find(c => c.id === key) || null;
    setFormData(prev => ({
      ...prev,
      client,
    }));
  };

  const handlePublicationTypeChange = (keys: any) => {
    const key = Array.from(keys)[0] as string;
    const publicationType = publicationTypes.find(pt => pt.id === key) || null;
    setFormData(prev => ({
      ...prev,
      publicationType: publicationType
        ? {
            id: publicationType.id,
            name: publicationType.name,
          }
        : null,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      endDate: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.client || !formData.publicationType || !formData.endDate) {
      setError('Пожалуйста, заполните все обязательные поля');
      return;
    }

    try {
      const subscriptionData: UpsertSubscriptionDto = {
        client: formData.client,
        publicationTypeId: formData.publicationType.id,
        endDate: new Date(formData.endDate).toISOString(),
      };
      await onSubmit(subscriptionData);
    } catch (err) {
      console.error('Error saving subscription:', err);
      setError('Не удалось сохранить подписку. Пожалуйста, попробуйте еще раз.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <ModalHeader>
          {subscription ? 'Редактировать подписку' : 'Добавить новую подписку'}
        </ModalHeader>
        <ModalBody>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select label="Клиент" required disabled={isSubmitting || isLoading}>
              {clients.map(client => (
                <SelectItem key={client.id}>
                  {`${client.lastName} ${client.firstName} ${client.middleName}`}
                </SelectItem>
              ))}
            </Select>

            <Select label="Тип издания" required disabled={isSubmitting || isLoading}>
              {publicationTypes.map(type => (
                <SelectItem key={type.id}>{type.name}</SelectItem>
              ))}
            </Select>

            <Input
              label="Дата окончания"
              name="endDate"
              type="date"
              value={formData.endDate}
              onChange={handleDateChange}
              required
              disabled={isSubmitting || isLoading}
            />

            <ModalFooter className="px-0">
              <div className="flex justify-between w-full">
                <div>
                  {subscription && onDelete && (
                    <Button
                      color="danger"
                      onPress={() => subscription && onDelete(subscription)}
                      disabled={isSubmitting || isLoading}
                      className="mr-2">
                      Удалить
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button onPress={onClose} disabled={isSubmitting || isLoading}>
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    isLoading={isSubmitting}
                    disabled={isLoading}>
                    {subscription ? 'Сохранить' : 'Добавить'}
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubscriptionForm;
