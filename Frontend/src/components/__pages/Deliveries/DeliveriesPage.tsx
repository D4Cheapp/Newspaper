'use client';

import { createDelivery, getDeliveries, updateDelivery } from '@/modules/deliveries/api';
import { CreateDeliveryDto, UpsertDeliveryDto } from '@/modules/deliveries/types';
import { Deliveries } from '@/modules/types';
import { Button } from '@heroui/react';
import { DeliveryStatus } from 'constants/statuses';

import { useCallback, useEffect, useState } from 'react';

import { DeliveriesFilter } from './DeliveriesFilter';
import { DeliveriesList } from './DeliveriesList';
import { DeliveryForm } from './DeliveryForm';

export const DeliveriesPage = () => {
  const [deliveries, setDeliveries] = useState<Deliveries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDelivery, setEditingDelivery] = useState<Deliveries | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState('');
  const [statusId, setStatusId] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const mapToDeliveries = (delivery: any): Deliveries => {
    if (
      !delivery ||
      !delivery.id ||
      !delivery.client ||
      !delivery.publication ||
      !delivery.deliveryStatus
    ) {
      console.error('Invalid delivery data:', delivery);
      throw new Error('Invalid delivery data received from API');
    }

    // Map the delivery status name to the corresponding enum value
    let statusName: DeliveryStatus;
    const statusLower = String(delivery.deliveryStatus.name).toLowerCase();

    if (statusLower.includes('обработ')) {
      statusName = DeliveryStatus.pending;
    } else if (statusLower.includes('доставк') && !statusLower.includes('доставлен')) {
      statusName = DeliveryStatus.completed;
    } else if (statusLower.includes('доставлен')) {
      statusName = DeliveryStatus.delivered;
    } else if (statusLower.includes('отмен')) {
      statusName = DeliveryStatus.canceled;
    } else {
      console.warn('Unknown delivery status:', delivery.deliveryStatus.name);
      statusName = DeliveryStatus.pending;
    }

    const mappedDelivery: Deliveries = {
      id: String(delivery.id),
      client: {
        id: String(delivery.client.id),
        firstName: delivery.client.firstName || '',
        lastName: delivery.client.lastName || '',
        middleName: delivery.client.middleName || '',
        phoneNumber: delivery.client.phoneNumber || '',
        email: delivery.client.email || '',
        address: delivery.client.address || '',
        createdAt: delivery.client.createdAt || new Date().toISOString(),
        updatedAt: delivery.client.updatedAt || new Date().toISOString(),
      },
      publication: {
        id: String(delivery.publication.id),
        name: delivery.publication.name || 'Неизвестное издание',
        description: delivery.publication.description || '',
        price: Number(delivery.publication.price) || 0,
        circulation: Number(delivery.publication.circulation) || 0,
        publicationType: delivery.publication.publicationType || { id: '1', name: 'Газета' },
        publicationStatus: delivery.publication.publicationStatus || { id: '1', name: 'Активна' },
        createdAt: delivery.publication.createdAt || new Date().toISOString(),
        updatedAt: delivery.publication.updatedAt || new Date().toISOString(),
      },
      deliveryStatus: {
        id: String(delivery.deliveryStatus.id),
        name: statusName,
      },
      quantity: Number(delivery.quantity) || 0,
      createdAt: delivery.createdAt || new Date().toISOString(),
      updatedAt: delivery.updatedAt || new Date().toISOString(),
    };

    return mappedDelivery;
  };

  const fetchDeliveries = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search,
        ...(statusId && { statusId }),
      };

      const response = await getDeliveries(params);

      const responseData = Array.isArray(response) ? response : response?.data || [];
      const deliveriesData = responseData.map(mapToDeliveries);
      setDeliveries(deliveriesData);

      if (response && typeof response === 'object' && !Array.isArray(response)) {
        setPagination(prev => ({
          ...prev,
          total: response.total || 0,
          totalPages: response.totalPages || 1,
        }));
      } else {
        setPagination(prev => ({
          ...prev,
          total: deliveriesData.length,
          totalPages: 1,
        }));
      }
    } catch (error) {
      console.error('Error fetching deliveries:', error);
      setDeliveries([]);
    } finally {
      setIsLoading(false);
    }
  }, [search, statusId, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchDeliveries();
  }, [fetchDeliveries]);

  const handleOpenModal = (delivery: Deliveries | null = null) => {
    setEditingDelivery(delivery);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDelivery(null);
  };

  const handleSubmit = async (formData: UpsertDeliveryDto) => {
    setIsSubmitting(true);
    try {
      // Convert string IDs to numbers and add required fields
      const deliveryData: CreateDeliveryDto = {
        ...formData,
        clientId: formData.clientId,
        publicationId: formData.publicationId,
        deliveryStatusId: formData.deliveryStatusId,
      };

      if (editingDelivery) {
        // Convert ID to number for the API call
        await updateDelivery(parseInt(editingDelivery.id, 10), deliveryData);
      } else {
        await createDelivery(deliveryData);
      }
      await fetchDeliveries();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving delivery:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold my-7">Управление доставками</h1>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <DeliveriesFilter
              search={search}
              statusId={statusId}
              onSearchChange={setSearch}
              onStatusChange={setStatusId}
            />
          </div>
          <Button color="primary" onPress={() => handleOpenModal()}>
            Добавить доставку
          </Button>
        </div>
      </div>

      <DeliveriesList deliveries={deliveries} isLoading={isLoading} onEdit={handleOpenModal} />

      <DeliveryForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        delivery={editingDelivery}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default DeliveriesPage;
