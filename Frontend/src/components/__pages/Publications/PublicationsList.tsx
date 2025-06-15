'use client';

import { getPublications } from '@/modules/publications/api/getPublications';
import { Publication } from '@/modules/types';
import { Spinner } from '@heroui/react';

import { useEffect, useState } from 'react';

import { PublicationListItem } from './PublicationListItem';

export const PublicationsList = () => {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        setIsLoading(true);
        const response = await getPublications();
        if (response) {
          setPublications(response);
          setError(null);
        } else {
          setPublications([]);
          setError('Не удалось загрузить публикации. Попробуйте обновить страницу.');
        }
      } catch (err) {
        console.error('Error loading publications:', err);
        setError('Не удалось загрузить публикации. Пожалуйста, попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPublications();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 bg-red-50 rounded-lg">{error}</div>;
  }

  if (publications.length === 0) {
    return <div className="text-center py-8 text-gray-500">Публикации не найдены</div>;
  }

  return (
    <div className="grid gap-4 mt-6">
      {publications.map(publication => (
        <PublicationListItem key={publication.id} publication={publication} />
      ))}
    </div>
  );
};
