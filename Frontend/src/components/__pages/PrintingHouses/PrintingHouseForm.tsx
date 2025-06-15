'use client';

import { PrintingHouses } from '@/modules/types';
import { UpsertPrintingHouseDto } from '@/modules/printing-houses/types';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@heroui/react';
import { useEffect, useState } from 'react';

interface PrintingHouseFormProps {
  isOpen: boolean;
  onClose: () => void;
  printingHouse?: PrintingHouses | null;
  onSubmit: (data: UpsertPrintingHouseDto) => Promise<void>;
  isSubmitting: boolean;
}

export const PrintingHouseForm = ({
  isOpen,
  onClose,
  printingHouse,
  onSubmit,
  isSubmitting,
}: PrintingHouseFormProps) => {
  const [formData, setFormData] = useState<UpsertPrintingHouseDto>({
    name: '',
    phoneNumber: '',
    email: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (printingHouse) {
      setFormData({
        name: printingHouse.name,
        phoneNumber: printingHouse.phoneNumber,
        email: printingHouse.email,
      });
    } else {
      setFormData({
        name: '',
        phoneNumber: '',
        email: '',
      });
    }
    setError(null);
  }, [printingHouse, isOpen]);

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
    
    if (!formData.name.trim()) {
      setError('Название типографии обязательно для заполнения');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError('Не удалось сохранить типографию');
      console.error('Error saving printing house:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {printingHouse ? 'Редактировать типографию' : 'Добавить типографию'}
            </ModalHeader>
            <ModalBody className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <Input
                label="Название"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Телефон"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Отмена
              </Button>
              <Button color="primary" type="submit" isLoading={isSubmitting}>
                {printingHouse ? 'Сохранить' : 'Добавить'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PrintingHouseForm;
