'use client';

import { createRequest, deleteRequest, getRequests, updateRequest } from '@/modules/requests/api';
import { Requests } from '@/modules/types';

import { useEffect, useState } from 'react';

import { RequestForm, RequestFormData } from './RequestForm';
import { RequestsFilter } from './RequestsFilter';
import { RequestsList } from './RequestsList';

export const RequestsPage = () => {
  const [requests, setRequests] = useState<Requests[]>([]);
  const [currentRequest, setCurrentRequest] = useState<RequestFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filters, setFilters] = useState<{ search?: string; status?: string }>({});

  const fetchRequests = async (params: { search?: string; status?: string } = {}) => {
    try {
      setIsLoading(true);
      const data = await getRequests({
        search: params.search,
        status: params.status,
      });

      if (data) {
        setRequests(Array.isArray(data) ? data : []);
      } else {
        setRequests([]);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(filters);
  }, [filters]);

  const handleCreate = () => {
    setCurrentRequest(null);
    setIsFormOpen(true);
  };

  const handleEdit = (request: Requests) => {
    const formData: RequestFormData = {
      id: request.id,
      client: request.client,
      status: request.status,
      serviceType: request.serviceType,
      description: request.description,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt,
    };
    setCurrentRequest(formData);
    setIsFormOpen(true);
  };

  const handleDelete = async (request: Requests) => {
    if (window.confirm('Вы уверены, что хотите удалить эту заявку?')) {
      try {
        setIsSubmitting(true);
        await deleteRequest(request.id);
        await fetchRequests(filters);
      } catch (error) {
        console.error('Error deleting request:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSubmit = async (formData: RequestFormData) => {
    try {
      setIsSubmitting(true);

      const requestData = {
        client: formData.client,
        status: formData.status,
        serviceType: formData.serviceType,
        description: formData.description,
      };

      if (formData.id) {
        await updateRequest(formData.id, requestData);
      } else {
        await createRequest(requestData);
      }

      await fetchRequests(filters);
      setIsFormOpen(false);
      setCurrentRequest(null);
    } catch (error) {
      console.error('Error saving request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFilterChange = (newFilters: { search?: string; status?: string }) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
    }));
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center my-7">
        <h1 className="text-2xl font-bold">Управление заявками</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <RequestsFilter
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          onCreate={handleCreate}
        />

        <RequestsList
          requests={requests}
          onEdit={handleEdit}
          onDelete={handleDelete}
          isLoading={isLoading}
        />

        {isFormOpen && (
          <RequestForm
            isOpen={isFormOpen}
            onClose={() => {
              setIsFormOpen(false);
              setCurrentRequest(null);
            }}
            request={currentRequest || undefined}
            onSubmit={handleSubmit}
            onDelete={
              currentRequest?.id ? () => handleDelete(currentRequest as Requests) : undefined
            }
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default RequestsPage;
