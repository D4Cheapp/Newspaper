import { UpsertClientDto } from '@/modules/clients';
import { deleteClient } from '@/modules/clients/api';
import { Client } from '@/modules/types';
import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader } from '@heroui/react';

import { useEffect, useState } from 'react';

interface ClientFormProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client | null;
  onSubmit: (data: UpsertClientDto) => Promise<void>;
  isSubmitting: boolean;
}

export const ClientForm = ({
  isOpen,
  onClose,
  client,
  onSubmit,
  isSubmitting,
}: ClientFormProps) => {
  const [formData, setFormData] = useState<UpsertClientDto>({
    firstName: '',
    lastName: '',
    middleName: '',
    phoneNumber: '',
    email: '',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (client) {
      setFormData({
        firstName: client.firstName,
        lastName: client.lastName,
        middleName: client.middleName || '',
        phoneNumber: client.phoneNumber,
        email: client.email,
        address: client.address,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        email: '',
        address: '',
      });
    }
  }, [client]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.firstName || !formData.lastName) {
      setError('Пожалуйста, укажите фамилию и имя');
      return;
    }

    if (!formData.phoneNumber) {
      setError('Пожалуйста, укажите номер телефона');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error saving client:', error);
      setError('Ошибка при сохранении клиента. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleDelete = async () => {
    if (!client?.id) return;

    if (window.confirm('Вы уверены, что хотите удалить этого клиента?')) {
      try {
        await deleteClient(client.id);
        onClose();
      } catch (error) {
        console.error('Error deleting client:', error);
        setError('Не удалось удалить клиента. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>{client ? 'Редактировать клиента' : 'Добавить нового клиента'}</ModalHeader>
        <ModalBody>
          {error && <div className="text-red-500 mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="bordered"
                required
              />
              <Input
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="bordered"
                required
              />
              <Input
                label="Отчество"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Телефон"
                name="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="bordered"
                required
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="bordered"
              />
            </div>

            <Input
              label="Адрес"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="bordered"
            />

            <div className="flex justify-between pt-4">
              <div>
                {client?.id && (
                  <Button color="danger" onPress={handleDelete} isDisabled={isSubmitting}>
                    Удалить
                  </Button>
                )}
              </div>
              <div className="flex gap-2">
                <Button onPress={onClose} isDisabled={isSubmitting}>
                  Отмена
                </Button>
                <Button color="primary" type="submit" isLoading={isSubmitting}>
                  {client ? 'Сохранить' : 'Добавить'}
                </Button>
              </div>
            </div>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
