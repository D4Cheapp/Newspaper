'use client';

import { getClients } from '@/modules/clients/api/getClients';
import { deleteDelivery } from '@/modules/deliveries/api/deleteDelivery';
import { UpsertDeliveryDto } from '@/modules/deliveries/types';
import { getPublications } from '@/modules/publications/api/getPublications';
import { Client, Deliveries, Publication } from '@/modules/types';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from '@heroui/react';
import { DeliveryStatus } from 'constants/statuses';

import { useEffect, useState } from 'react';

interface StatusOption {
  key: string;
  label: string;
}

interface ClientOption extends Client {
  displayName: string;
}

interface PublicationOption extends Publication {
  displayName: string;
}

interface DeliveryFormProps {
  isOpen: boolean;
  onClose: () => void;
  delivery?: Deliveries | null;
  onSubmit: (data: UpsertDeliveryDto) => Promise<void>;
  isSubmitting: boolean;
}

export const DeliveryForm: React.FC<DeliveryFormProps> = ({
  isOpen,
  onClose,
  delivery,
  onSubmit,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<UpsertDeliveryDto>(() => ({
    clientId: '',
    publicationId: '',
    deliveryStatusId: DeliveryStatus.pending,
    quantity: 1,
  }));

  const [clients, setClients] = useState<ClientOption[]>([]);
  const [publications, setPublications] = useState<PublicationOption[]>([]);
  const [statusOptions, setStatusOptions] = useState<StatusOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (delivery) {
      setFormData({
        clientId: delivery.client.id,
        publicationId: delivery.publication.id,
        deliveryStatusId: delivery.deliveryStatus.id,
        quantity: delivery.quantity,
      });
    } else {
      setFormData({
        clientId: '',
        publicationId: '',
        deliveryStatusId: DeliveryStatus.pending,
        quantity: 1,
      });
    }
  }, [delivery]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [clientsData, publicationsData] = await Promise.all([
          getClients(),
          getPublications(),
        ]);

        const clientOptions = (clientsData || []).map(client => ({
          ...client,
          displayName: `${client.lastName} ${client.firstName} ${client.middleName || ''}`.trim(),
        }));

        const publicationOptions = (publicationsData || []).map(pub => ({
          ...pub,
          displayName: pub.name,
        }));

        const statusOptions = Object.entries(DeliveryStatus)
          .filter(([key]) => isNaN(Number(key)))
          .map(([key, value]) => ({
            key: value,
            label: value,
          }));

        setClients(clientOptions);
        setPublications(publicationOptions);
        setStatusOptions(statusOptions);

        if (delivery) {
          setFormData({
            clientId: delivery.client.id,
            publicationId: delivery.publication.id,
            deliveryStatusId: delivery.deliveryStatus.id,
            quantity: delivery.quantity,
          });
        } else {
          setFormData({
            clientId: '',
            publicationId: '',
            deliveryStatusId: DeliveryStatus.pending,
            quantity: 1,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Не удалось загрузить необходимые данные');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, delivery]);

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (!delivery) {
        setFormData({
          clientId: '',
          publicationId: '',
          deliveryStatusId: DeliveryStatus.pending,
          quantity: 1,
        });
      }
    }
  }, [isOpen, delivery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: keyof UpsertDeliveryDto, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.clientId) {
      setError('Пожалуйста, выберите клиента');
      return;
    }

    if (!formData.publicationId) {
      setError('Пожалуйста, выберите публикацию');
      return;
    }

    if (!formData.deliveryStatusId) {
      setError('Пожалуйста, выберите статус доставки');
      return;
    }

    if (!formData.quantity || formData.quantity <= 0) {
      setError('Количество должно быть больше нуля');
      return;
    }

    try {
      await onSubmit({
        ...formData,
        quantity: Number(formData.quantity),
      });
      onClose();
    } catch (error) {
      console.error('Error submitting delivery:', error);
      setError('Ошибка при сохранении доставки. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleDelete = async () => {
    if (!delivery?.id) return;

    if (window.confirm('Вы уверены, что хотите удалить эту доставку?')) {
      try {
        await deleteDelivery(Number(delivery.id));
        onClose();
      } catch (error) {
        console.error('Error deleting delivery:', error);
        setError('Не удалось удалить доставку. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>{delivery ? 'Редактировать доставку' : 'Добавить новую доставку'}</ModalHeader>
        <ModalBody>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label="Клиент"
              selectedKeys={formData.clientId ? [formData.clientId] : []}
              onSelectionChange={keys => {
                const selectedKey = Array.from(keys)[0] as string;
                handleSelectChange('clientId', selectedKey);
              }}
              variant="bordered"
              disabled={isLoading}>
              {clients.map(client => (
                <SelectItem key={client.id}>{client.displayName}</SelectItem>
              ))}
            </Select>

            <Select
              label="Издание"
              selectedKeys={formData.publicationId ? [formData.publicationId] : []}
              onSelectionChange={keys => {
                const selectedKey = Array.from(keys)[0] as string;
                handleSelectChange('publicationId', selectedKey);
              }}
              variant="bordered"
              disabled={isLoading}>
              {publications.map(pub => (
                <SelectItem key={pub.id}>{pub.displayName}</SelectItem>
              ))}
            </Select>

            <Select
              label="Статус доставки"
              selectedKeys={formData.deliveryStatusId ? [formData.deliveryStatusId] : []}
              onSelectionChange={keys => {
                const selectedKey = Array.from(keys)[0] as string;
                handleSelectChange('deliveryStatusId', selectedKey);
              }}
              variant="bordered"
              disabled={isLoading}>
              {Object.entries(DeliveryStatus)
                .filter(([key]) => isNaN(Number(key)))
                .map(([key, value]) => (
                  <SelectItem key={value}>{value}</SelectItem>
                ))}
            </Select>

            <Input
              label="Количество"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity.toString()}
              onChange={handleChange}
              variant="bordered"
              disabled={isLoading}
            />

            <div className="flex justify-between pt-4">
              <div>
                {delivery?.id && (
                  <Button
                    color="danger"
                    onPress={handleDelete}
                    isDisabled={isSubmitting || isLoading}>
                    Удалить
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button onPress={onClose} isDisabled={isSubmitting || isLoading}>
                  Отмена
                </Button>
                <Button
                  color="primary"
                  type="submit"
                  isLoading={isSubmitting}
                  isDisabled={isLoading}>
                  {delivery ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DeliveryForm;
