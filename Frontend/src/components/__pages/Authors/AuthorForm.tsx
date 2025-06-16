'use client';

import { UpsertAuthorDto } from '@/modules/authors';
import { deleteAuthor } from '@/modules/authors/api';
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

  const handleSubmit = async () => {
    setError('');

    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      setError('Пожалуйста, укажите фамилию и имя');
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error('Error saving author:', error);
      setError('Ошибка при сохранении автора. Пожалуйста, попробуйте еще раз.');
    }
  };

  const handleDelete = async () => {
    if (!author?.id) return;

    if (window.confirm('Вы уверены, что хотите удалить этого автора?')) {
      try {
        await deleteAuthor(author.id);
        onClose();
      } catch (error) {
        console.error('Error deleting author:', error);
        setError('Не удалось удалить автора. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {author ? 'Редактировать автора' : 'Добавить автора'}
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            {error && <div className="text-red-500">{error}</div>}
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
          </div>
        </ModalBody>
        <ModalFooter className="justify-between">
          <div>
            {author?.id && (
              <Button color="danger" onPress={handleDelete} isDisabled={isSubmitting}>
                Удалить
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button onPress={onClose} isDisabled={isSubmitting}>
              Отмена
            </Button>
            <Button color="primary" onPress={handleSubmit} isLoading={isSubmitting} type="button">
              {author ? 'Сохранить' : 'Добавить'}
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AuthorForm;
