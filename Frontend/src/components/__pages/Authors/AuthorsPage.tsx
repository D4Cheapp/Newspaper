'use client';

import { UpsertAuthorDto } from '@/modules/authors';
import { createAuthor, getAuthors, updateAuthor } from '@/modules/authors/api';
import { Author } from '@/modules/types';
import { Button } from '@heroui/react';

import { useCallback, useEffect, useState } from 'react';

import { AuthorForm } from './AuthorForm';
import { AuthorsFilter } from './AuthorsFilter';
import { AuthorsList } from './AuthorsList';

export const AuthorsPage = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [search, setSearch] = useState('');

  const fetchAuthors = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await getAuthors({ search });
      setAuthors(response || []);
    } catch (error) {
      console.error('Error fetching authors:', error);
      setAuthors([]);
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchAuthors();
  }, [fetchAuthors]);

  const handleOpenModal = (author: Author | null = null) => {
    setEditingAuthor(author);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAuthor(null);
  };

  const handleSubmit = async (data: UpsertAuthorDto) => {
    setIsSubmitting(true);
    try {
      if (editingAuthor) {
        await updateAuthor(editingAuthor.id, data);
      } else {
        await createAuthor(data);
      }
      await fetchAuthors();
    } catch (error) {
      console.error('Error saving author:', error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold my-7">Авторы</h1>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <AuthorsFilter search={search} onSearchChange={setSearch} />
          </div>
          <Button color="primary" onPress={() => handleOpenModal()}>
            Добавить автора
          </Button>
        </div>
      </div>

      <AuthorsList authors={authors} isLoading={isLoading} onEdit={handleOpenModal} />

      <AuthorForm
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        author={editingAuthor}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default AuthorsPage;
