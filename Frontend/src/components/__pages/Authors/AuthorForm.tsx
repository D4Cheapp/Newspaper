'use client';

import { UpsertAuthorDto } from '@/modules/authors';
import { Author } from '@/modules/types';
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

interface AuthorFormProps {
  isOpen: boolean;
  onClose: () => void;
  author?: Author | null;
  onSubmit: (data: UpsertAuthorDto) => Promise<void>;
  isSubmitting: boolean;
}

export const AuthorForm = ({
  isOpen,
  onClose,
  author,
  onSubmit,
  isSubmitting,
}: AuthorFormProps) => {
  const [formData, setFormData] = useState<UpsertAuthorDto>({
    firstName: '',
    lastName: '',
    middleName: '',
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (author) {
      setFormData({
        firstName: author.firstName,
        lastName: author.lastName,
        middleName: author.middleName,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        middleName: '',
      });
    }
    setError(null);
  }, [author, isOpen]);

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

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Имя и фамилия обязательны для заполнения');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError('Не удалось сохранить автора');
      console.error('Error saving author:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {onClose => (
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              {author ? 'Редактировать автора' : 'Добавить автора'}
            </ModalHeader>
            <ModalBody className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Input
                label="Фамилия"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Имя"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                isRequired
              />
              <Input
                label="Отчество"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onClose}>
                Отмена
              </Button>
              <Button color="primary" type="submit" isLoading={isSubmitting}>
                {author ? 'Сохранить' : 'Добавить'}
              </Button>
            </ModalFooter>
          </form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AuthorForm;
