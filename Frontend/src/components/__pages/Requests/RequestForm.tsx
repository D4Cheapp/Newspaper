'use client';

import { getClients } from '@/modules/clients';
import { Client, EntityType } from '@/modules/types';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@heroui/react';
import { ServiceTypes } from 'constants/entity-types';
import { RequestStatus } from 'constants/statuses';

import { useEffect, useState } from 'react';

// RequestFormData is used for the form and can have an optional id for new records
export interface RequestFormData {
  id?: string; // Optional for new records
  client: Client;
  status: EntityType<RequestStatus>;
  serviceType: EntityType<ServiceTypes>;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

interface RequestFormProps {
  isOpen: boolean;
  onClose: () => void;
  request?: RequestFormData | null;
  onSubmit: (data: RequestFormData) => void;
  onDelete?: () => void;
  isSubmitting?: boolean;
}

export const RequestForm: React.FC<RequestFormProps> = ({
  isOpen,
  onClose,
  request,
  onSubmit,
  onDelete,
  isSubmitting,
}: RequestFormProps) => {
  const defaultStatus: EntityType<RequestStatus> = {
    id: Object.keys(RequestStatus)[0] || '',
    name: Object.values(RequestStatus)[0] as RequestStatus,
  };

  const defaultServiceType: EntityType<ServiceTypes> = {
    id: Object.keys(ServiceTypes)[0] || '',
    name: Object.values(ServiceTypes)[0] as ServiceTypes,
  };

  const defaultClient: Client = {
    id: '',
    address: '',
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: '',
    email: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const [formData, setFormData] = useState<RequestFormData>({
    client: defaultClient,
    status: defaultStatus,
    serviceType: defaultServiceType,
    description: '',
  });

  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoadingClients, setIsLoadingClients] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setIsLoadingClients(true);
        const clients = await getClients();
        setClients(Array.isArray(clients) ? clients : []);
      } catch (error) {
        console.error('Error fetching clients:', error);
        setError('Не удалось загрузить список клиентов');
      } finally {
        setIsLoadingClients(false);
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    if (request) {
      const formData: RequestFormData = {
        ...request,
        client: request.client || defaultClient,
        status: request.status || defaultStatus,
        serviceType: request.serviceType || defaultServiceType,
        description: request.description || '',
      };
      setFormData(formData);
    } else {
      setFormData({
        client: defaultClient,
        status: defaultStatus,
        serviceType: defaultServiceType,
        description: '',
      });
    }
  }, [request]);

  const handleClientChange = (clientId: string) => {
    const selectedClient = clients.find(c => c.id === clientId);
    if (selectedClient) {
      setFormData(prev => ({
        ...prev,
        client: selectedClient,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.client.id) {
      setError('Пожалуйста, выберите клиента');
      return;
    }

    try {
      setError(null);
      await onSubmit(formData);
    } catch (error) {
      setError('Произошла ошибка при сохранении заявки');
      console.error('Error saving request:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader className="flex flex-col gap-1">
            {request?.id ? 'Редактировать заявку' : 'Создать заявку'}
          </ModalHeader>
          <ModalBody className="space-y-4">
            {error && (
              <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Клиент"
                isRequired
                disabled={isLoadingClients || isSubmitting}
                isLoading={isLoadingClients}>
                {clients.map(client => (
                  <SelectItem key={client.id}>
                    {`${client.lastName} ${client.firstName} ${client.middleName || ''}`.trim()}
                  </SelectItem>
                ))}
              </Select>

              <Select label="Статус" isRequired disabled={isSubmitting}>
                {Object.entries(RequestStatus).map(([key, value]) => (
                  <SelectItem key={key}>{value}</SelectItem>
                ))}
              </Select>

              <Select
                label="Тип услуги"
                selectedKeys={formData.serviceType?.id ? [formData.serviceType.id] : []}
                className="col-span-2"
                onSelectionChange={keys => {
                  const serviceId = Array.from(keys)[0] as string;
                  const serviceName = Object.entries(ServiceTypes).find(
                    ([key]) => key === serviceId
                  )?.[1];

                  if (serviceName) {
                    setFormData(prev => ({
                      ...prev,
                      serviceType: {
                        id: serviceId,
                        name: serviceName,
                      },
                    }));
                  }
                }}
                isRequired
                disabled={isSubmitting}>
                {Object.entries(ServiceTypes).map(([key, value]) => (
                  <SelectItem key={key}>{value}</SelectItem>
                ))}
              </Select>
            </div>

            <div>
              <Textarea
                label="Описание"
                value={formData.description}
                onChange={e =>
                  setFormData(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                isRequired
                disabled={isSubmitting}
                minRows={4}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex justify-between w-full">
              <div>
                {onDelete && (
                  <Button color="danger" onPress={onDelete} isDisabled={isSubmitting}>
                    Удалить
                  </Button>
                )}
              </div>
              <div className="space-x-2">
                <Button color="default" onPress={onClose} isDisabled={isSubmitting}>
                  Отмена
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}>
                  {formData.id ? 'Сохранить' : 'Создать'}
                </Button>
              </div>
            </div>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default RequestForm;
