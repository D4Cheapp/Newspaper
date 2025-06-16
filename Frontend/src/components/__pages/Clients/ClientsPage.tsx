'use client';

import { createClient, deleteClient, getClients, updateClient } from '@/modules/clients/api';
import { GetClientsParams } from '@/modules/clients/types';
import { Client } from '@/modules/types';
import { Button } from '@heroui/react';

import { useCallback, useEffect, useState } from 'react';

import { ClientForm } from './ClientForm';
import { ClientsFilter } from './ClientsFilter';
import { ClientsList } from './ClientsList';

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [search, setSearch] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const fetchClients = useCallback(async () => {
    try {
      setIsLoading(true);
      const params: GetClientsParams = {
        page: pagination.page,
        limit: pagination.limit,
        search: search || undefined,
      };

      const response = await getClients(params);

      if (!response) {
        setClients([]);
        setPagination(prev => ({
          ...prev,
          total: 0,
          totalPages: 1,
        }));
        return;
      }

      setClients(response);
      setPagination(prev => ({
        ...prev,
        total: response.length,
        totalPages: Math.ceil(response.length / pagination.limit) || 1,
      }));
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setIsLoading(false);
    }
  }, [search, pagination.page, pagination.limit]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleOpenModal = (client: Client | null = null) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingClient(null);
  };

  const handleSubmit = async (formData: Parameters<typeof createClient>[0]) => {
    setIsSubmitting(true);
    try {
      if (editingClient) {
        await updateClient(editingClient.id, formData);
      } else {
        await createClient(formData);
      }
      await fetchClients();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving client:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (client: Client) => {
    if (
      window.confirm(
        `Вы уверены, что хотите удалить клиента ${client.lastName} ${client.firstName}?`
      )
    ) {
      try {
        await deleteClient(client.id);
        await fetchClients();
      } catch (error) {
        console.error('Error deleting client:', error);
        alert('Не удалось удалить клиента. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({
      ...prev,
      page,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold my-7">Управление клиентами</h1>
        <div className="flex items-center justify-between gap-4">
          <ClientsFilter search={search} onSearchChange={setSearch} />
          <Button color="primary" onPress={() => handleOpenModal()}>
            Добавить клиента
          </Button>
        </div>
      </div>

      <ClientsList
        clients={clients}
        isLoading={isLoading}
        onEdit={handleOpenModal}
        onDelete={handleDelete}
      />

      <ClientForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        client={editingClient}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ClientsPage;
